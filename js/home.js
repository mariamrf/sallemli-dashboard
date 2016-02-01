var todovm = new Vue({
	el: '#todo',
	data: {
		assignments:[
		{name: 'Sheet 1', url: 'assignment?CS04&2', course: 'Computer Networks', due: moment("2016-02-05").fromNow(), date: '05-02-2016'},
		{name: 'Assignment 4', url: 'assignment?AN01&4', course: 'Analog Communication', due: moment("2016-03-01").fromNow(), date: '01-03-2016'}
		]
	}
});

var coursevm = new Vue({
	el: '#your-courses',
	data: {
		courses: [
		{name: 'Analog Communication', url: 'course?AN01', icon: 'fa-graduation-cap'}, //student
		{name: 'Database Systems', url: 'course?IS02', icon: 'fa-coffee'}, //teacher
		{name: 'Stay Up Late', url: 'course?ME01', icon: 'fa-coffee'},
		{name: 'Computer Networks', url:'course?CS04', icon: 'fa-graduation-cap'}
		]
	}
});

var submissionvm = new Vue({
	el: '#your-submissions',
	data: {
		submissions: [
		{name: 'Sheet 0', url: 'assignment?CS04&1', course: 'Computer Networks'},
		{name: 'Assignment 3', url: 'assignment?AN01&3', course: 'Analog Communication'},
		{name: 'Assignment 2', url: 'assignment?AN01&2', course: 'Analog Communication'},
		{name: 'Assignment 1', url: 'assignment?AN01&1', course: 'Analog Communication'}
		]
	}
});