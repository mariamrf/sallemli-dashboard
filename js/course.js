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
	},
	methods: {
		
	}
});
function hasSubs(id){
			var flag=false;
				for(var j=0; j<allSubmissions.length; j++){
					if(allSubmissions[j].student.toLowerCase() == id && allSubmissions[j].course.toLowerCase()==courseID.toLowerCase())
					 {flag=true; break;}
				}
	
			return flag;
};

$('.student-list').each(function(){
	var sID = $(this).attr('id');
	var subs = 'view-subs-' + sID;
	if(!hasSubs(sID)){
		$('#'+subs).empty();
		$('#'+subs).append('<span style="text-transform: uppercase; color: red;">No submissions yet</span>');
	}
});

if(document.location.search.length != 0){ //why this doesn't work as expected I will never know
	if(courseID && coursevm.isAvailable){
	$('#course-details').css('display', 'block');
} else {
	$('#course-container').load('404.html');
}
}else{
	$('#course-container').load('404.html');
}


function checkMe(){
	if(courseID) return true;
	else return false;
}