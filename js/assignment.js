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
		all_courses: [ //here I'm assuming the user is either a teacher or enrolled because prototype
		{id: 'AN01', name: 'Analog Communications', school: 'Faculty of Engineering, Alex U', desc: 'Communicate via analog lol', teacher: false, assignments: [{name: 'Assignment 1', submissions: 20, due: "2016-04-05", submitted: true}, {name: 'Assignment 2', submissions: 5, due: "2016-02-01", submitted: true}, {name: 'Assignment 3', submissions: 8, due: "2016-02-03", submitted: true}, {name: 'Assignment 4', submissions: 5, due: "2016-03-01", submitted: false}]},
		{id: 'CS04', name: 'Computer Networks', school: 'Computer Science, AAST', desc: 'Connect your computers', teacher: false, assignments: [{name: 'Sheet 0', submissions: 17, due: "2016-04-05", submitted: true}, {name: 'Sheet 1', submissions: 5, due: "2016-02-05", submitted: false}]},
		{id: 'IS02', name: 'Database Systems', school: 'Faculty of Agriculture', desc: 'Make your databases', teacher: true, assignments: [{name: 'Sheet 0', submissions: 20, due: "2016-01-05"}]},
		{id: 'ME01', name: 'Stay Up Late', school: 'Life', desc:'You know you wanna', teacher: true}

		]
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
