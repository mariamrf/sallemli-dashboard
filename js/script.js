

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
  		window.location.href = 'results?q=' + $('.search').val();
  	}
   
//<---search function
   
  }
});

 });

var menuvm = new Vue({
	el: '#top-menu',
	data:{
		seen: lastSeen,
		unfiltered_alerts: alerts,
		message_link: 'alerts',
		items: [
		{name: 'Jane Doe', url: 'profile', icon:'fa-user'},
		{name: 'Add Course', url:'add-course', icon: 'fa-plus-square-o'},
		//,
		//{name: 'Help', url:'#help', icon: 'fa-question'}
		]
	},
	computed: {
		all_alerts: function(){
			var res = [];
			if(this.unfiltered_alerts>10){
				for(var i=0; i<10; i++){
					res.push(this.unfiltered_alerts[i]);
				}
				return res;
			}
			else return this.unfiltered_alerts;
			
		},
		messages: function(){
			if(this.number_of_messages==0) return 'Alerts';
			else return 'Alerts <div class="alerts-icon">' + this.number_of_messages + '</div>'; 
		},
		number_of_messages: function(){
			var count=0;
			for(var i=0; i<this.unfiltered_alerts.length; i++){
				if(this.unfiltered_alerts[i].date > this.seen) count++;
			}
			return count;

		}

	}
});
var navmenuvm = new Vue({
	el: '#NavMenu',
	data:{
		seen: lastSeen,
		message_link: 'alerts',
		items: [
		{name: 'Jane Doe', url: 'profile', icon:'fa-user'},
		{name: 'Add Course', url:'add-course', icon: 'fa-plus-square-o'}//,
		//{name: 'Help', url:'#help', icon: 'fa-question'}
		]
	},
	computed: {
		messages: function(){
			if(this.number_of_messages==0) return 'Alerts';
			else return 'Alerts <div class="alerts-icon">' + this.number_of_messages + '</div>'; 
		},
		number_of_messages: function(){
			var count=0;
			for(var i=0; i<menuvm.unfiltered_alerts.length; i++){
				if(menuvm.unfiltered_alerts[i].date > this.seen) count++;
			}
			return count;

		}
	}
});



$('#alerts-dropdown-button').click(function(){
	lastSeen = new moment();
	menuvm.seen = lastSeen;
	navmenuvm.seen = lastSeen;
})