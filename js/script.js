

 $(document).ready(function(){

 	$('[title]').qtip({
 	style:{
 		classes: 'qtip-tipsy'
 	}
 });
 } )//TOOLTIPS



 $(window).load(function(){ //because search gets stuck in weird places..


 	$('#top-menu ul:first').append('<li><input type="search" class="search" placeholder="Find course.."></input></li>'); //add this to actual code, or just put in the whole thing via javascript


$('.search').keypress(function (e) {
  if (e.which == 13) {
  	var value = $('.search').val();
  	if(value!=""){
  		window.location.href = 'results.html?q=' + $('.search').val();
  	}
   
//<---search function
   
  }
});

 });

var menuvm = new Vue({
	el: '#top-menu',
	data:{
		number_of_messages: 3, //since last viewed. Last viewed is a variable with every user.
		message_link: '#messages',
		items: [
		{name: 'Jane Doe', url: 'profile', icon:'fa-user'},
		{name: 'Add Course', url:'add-course', icon: 'fa-plus-square-o'},
		//,
		//{name: 'Help', url:'#help', icon: 'fa-question'}
		]
	},
	computed: {
		messages: function(){
			return 'Alerts <div class="alerts-icon">' + this.number_of_messages + '</div>'; 
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
		{name: 'Add Course', url:'add-course', icon: 'fa-plus-square-o'}//,
		//{name: 'Help', url:'#help', icon: 'fa-question'}
		]
	},
	computed: {
		messages: function(){
			return 'Alerts <div class="alerts-icon">' + this.number_of_messages + '</div>';
		}
	}
});



