
 $(document).ready(function(){

 	$('.fa-graduation-cap').attr("title", "Student"); //fix this
 	$('.fa-coffee').attr("title", "Teacher");
 	$('[title]').qtip({
 	style:{
 		classes: 'qtip-tipsy'
 	}
 });} )//TOOLTIPS

var todovm = new Vue({
	el: '#todo',
	data: {
		assignments_unfiltered: myAssignments //from db.js
	},
	computed: {
		morethanfive: function(){
			if(this.assignments.length>5) return true; //why both, you ask? Because I can. (and because I'll need the first when handling actual data. I think.)
			else return false;
		},
		assignments: function(){
			return myAssignments.slice(0,5);
		}
	}
});

var coursevm = new Vue({
	el: '#your-courses',
	data: {
		courses_unfiltered: myCourses
	},
	computed: {
		morethanfive: function(){
			if(this.courses_unfiltered.length>5) return true;
			else return false;
		},
		courses: function(){
			return myCourses.slice(0,5);
		}
	}
});

var submissionvm = new Vue({
	el: '#your-submissions',
	data: {
		submissions_unfiltered: mySubmissions
	},
	computed: {
		morethanfive: function(){
			if(this.submissions.length>5) return true;
			else return false;
		},
		submissions: function(){
			return mySubmissions.slice(0,5);
		}
	}
});

