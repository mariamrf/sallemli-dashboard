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
		{name: 'Jane Doe', url: 'profile.html', icon:'fa-user'},
		{name: 'Add Course', url:'add-course.html', icon: 'fa-plus-square-o'},
		{name: 'Find Course', url:'find-course.html', icon: 'fa-search'},
		{name: 'Help', url:'#help', icon: 'fa-question'}
		]
	}
});
var navmenuvm = new Vue({
	el: '#NavMenu',
	data:{
		items: [
		{name: 'Jane Doe', url: 'profile.html', icon:'fa-user'},
		{name: 'Add Course', url:'add-course.html', icon: 'fa-plus-square-o'},
		{name: 'Find Course', url:'find-course.html', icon: 'fa-search'},
		{name: 'Help', url:'#help', icon: 'fa-question'}
		]
	}
});


