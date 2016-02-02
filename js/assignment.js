Vue.config.debug = true;

var query = document.URL.split('?')[1];
if(query != undefined){
var courseID, assignmentID;
if(query.split('&')[0]==undefined) courseID = query;
else {courseID=query.split('&')[0]; assignmentID = parseInt(query.split('&')[1]); }//relative to course, that's why we need both, unless there's a unique id generated for each assignment..

}

var sheetvm = new Vue({
	el: '#sheet-details',
	data: {
		all_courses: myCourses
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
			else if(!this.all_courses[this.courseIndex].assignments[assignmentID-1]) return false;
			else return true;
		},
		assignmentIndex: function(){
			return assignmentID-1;
		}
	}
});




if(query==undefined ||courseID == undefined || courseID == "" || assignmentID==undefined || assignmentID==""|| Number.isNaN(assignmentID)|| !sheetvm.isAvailable){
	$('#sheet-container').load('404.html');
}
else{
	$('#sheet-details').css('display', 'block');
}
