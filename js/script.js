var bodyvm = new Vue({
	el: 'body',
	data: {
		topMenu: '<div class="container-fluid" id="top-menu"></div><script>var link = document.querySelector('+'link[rel="import"]'+');var template = link.import.querySelector('+'template'+');var clone = document.importNode(template.content, true);document.querySelector('+'#top-menu'+').appendChild(clone);</script>'
	}
});

 $(document).ready(function(){

 	$('.fa-graduation-cap').attr("title", "Student"); //fix this
 	$('.fa-coffee').attr("title", "Teacher");
 	$('[title]').qtip({
 	style:{
 		classes: 'qtip-tipsy'
 	}
 });} )//TOOLTIPS

var menuvm = new Vue({
	el: '#top-menu',
	data:{
		number_of_messages: 3, //since last viewed. Last viewed is a variable with every user.
		message_link: '#messages',
		items: [
		{name: 'Jane Doe', url: 'profile', icon:'fa-user'},
		{name: 'Add Course', url:'add-course', icon: 'fa-plus-square-o'},
		{name: 'Find Course', url:'find-course', icon: 'fa-search'}//,
		//{name: 'Help', url:'#help', icon: 'fa-question'}
		]
	},
	computed: {
		messages: function(){
			return 'Messages (' + this.number_of_messages + ')'; 
		}
	}
});
var navmenuvm = new Vue({
	el: '#NavMenu',
	data:{
		number_of_messages: 3,
		message_link: '#messages',
		items: [
		{name: 'Jane Doe', url: 'profile', icon:'fa-user'},
		{name: 'Add Course', url:'add-course', icon: 'fa-plus-square-o'},
		{name: 'Find Course', url:'find-course', icon: 'fa-search'},
		{name: 'Help', url:'#help', icon: 'fa-question'}
		]
	},
	computed: {
		messages: function(){
			return 'Messages (' + this.number_of_messages + ')';
		}
	}
});


