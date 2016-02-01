Vue.config.debug = true;
var courseID = document.URL.split('?')[1];
var coursevm = new Vue({
	el: '#course-details',
	data: {
		all_courses: [ //here I'm assuming the user is either a teacher or enrolled because prototype
		{id: 'AN01', name: 'Analog Communications', school: 'Faculty of Engineering, Alex U', desc: 'Communicate via analog lol', teacher: false, assignments: [{id: 1, name: 'Assignment 1', submissions: 20, due: moment("2016-04-05").fromNow(), submitted: true}, {id:2, name: 'Assignment 2', submissions: 5, due: moment("2016-02-01").fromNow(), submitted: true}, {id:3, name: 'Assignment 3', submissions: 8, due: moment("2016-02-03").fromNow(), submitted: true}, {id: 4,name: 'Assignment 4', submissions: 5, due: moment("2016-03-01").fromNow(), submitted: false}]},
		{id: 'CS04', name: 'Computer Networks', school: 'Computer Science, AAST', desc: 'Connect your computers', teacher: false, assignments: [{id: 1, name: 'Sheet 0', submissions: 17, due: moment("2016-04-05").fromNow(), submitted: true}, {id: 2, name: 'Sheet 1', submissions: 5, due: moment("2016-02-05").fromNow(), submitted: false}]},
		{id: 'IS02', name: 'Database Systems', school: 'Faculty of Agriculture', desc: 'Make your databases', teacher: true, assignments: [{id: 1, name: 'Sheet 0', submissions: 20, due: moment("2016-01-05").fromNow()}]},
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
			else return true;
		}
	}
});


if(courseID == undefined || courseID == "" || !coursevm.isAvailable){
	$('#course-container').load('404.html');
}
else{
	$('#course-details').css('display', 'block');
}

