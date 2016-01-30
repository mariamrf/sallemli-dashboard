 $(document).ready(function(){

 	$('.fa-graduation-cap').attr("title", "Student");
 	$('.fa-coffee').attr("title", "Teacher");
 	$('[title]').qtip({
 	style:{
 		classes: 'qtip-tipsy'
 	}
 });} )//TOOLTIPS

var menuvm = new Vue({
	el: '#top-menu',
	data:{
		items: [
		{name: 'Jane Doe', url: '#profile', icon:'fa-user'},
		{name: 'Add Course', url:'#add-course', icon: 'fa-plus-square-o'},
		{name: 'Find Course', url:'#find-course', icon: 'fa-search'}
		]
	}
});

var todovm = new Vue({
	el: '#todo',
	data: {
		assignments:[
		{name: 'Sheet 1', url: '#sheet-1', course: 'Computer Networks', due: moment("2016-02-05").fromNow(), date: '05-02-2016'},
		{name: 'Assignment 4', url: '#assignment-4', course: 'Analog Communication', due: moment("2016-03-01").fromNow(), date: '01-03-2016'}
		]
	}
});

var coursevm = new Vue({
	el: '#your-courses',
	data: {
		courses: [
		{name: 'Analog Communication', url: '#analog', icon: 'fa-graduation-cap'}, //student
		{name: 'Database Systems', url: '#database', icon: 'fa-coffee'}, //teacher
		{name: 'Stay Up Late', url: '#me', icon: 'fa-coffee'},
		{name: 'Computer Networks', url:'#networks', icon: 'fa-graduation-cap'}
		]
	}
});