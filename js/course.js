Vue.config.debug = true;
var courseID = document.URL.split('?')[1];
var coursevm = new Vue({
	el: '#course-details',
	data: {
		all_courses: myCourses //until we add more not-my-courses
	},
	computed: {
		courseIndex: function(){
			var course = courseID.toLowerCase();
			var index;
			for(index=0; index<=this.all_courses.length; index++){ //the extra one for 'not found'
				if(index!=this.all_courses.length){
				if(this.all_courses[index].id.toLowerCase()==course){
					break;
				}
			}
			}
			if(index<this.all_courses.length) return index;
			else return -1;
		},
		isAvailable: function(){
			if(this.courseIndex==-1) return false;
			else return true;
		},
		teachers: function(){
			return this.all_courses[this.courseIndex].teachers;
		}
	}
});


if(courseID == undefined || courseID == "" || !coursevm.isAvailable){
	$('#course-container').load('404.html');
}
else{
	$('#course-details').css('display', 'block');
}

