Vue.config.debug = true;
var queryphrase = document.URL.split('?')[1];
var courseID = queryphrase.split('&')[0];
var studentID = queryphrase.split('&')[1];


var submittedvm = new Vue({
	el: '#submitted-details',
	data: {
		submissions: allSubmissions
	},
	computed: {
		submissionIndex: function(){
			var course = courseID.toLowerCase();
			var student = studentID.toLowerCase(); //in case someone has a student ID with letters inside
			var i;
			for(i=0; i<=this.submissions.length; i++){
				if(i!=this.submissions.length){
					if(course==this.submissions[i].course.toLowerCase() && student == this.submissions[i].student.toLowerCase())
						break;
				}
			}
			if(i<this.submissions.length) return i;
			else return -1;
		},
		isAvailable: function(){
			if(this.submissionIndex==-1) return false;
			else return true;
		},
		studentName: function(){
			var name;
			for(var i=0; i<allStudents.length; i++){
				if(allStudents[i].id==studentID){name=allStudents[i].name; break;}
			}
			return name;
		},
		courseIndex: function(){
			var i;
			for(i=0; i<=myCourses.length; i++){
				if(i!=myCourses.length){if(courseID.toLowerCase() == myCourses[i].id.toLowerCase()) break;}
			}
			if(i<myCourses.length) return i;
			else return -1; //not supposed to happen. EVER. 
		},
		course: function(){
			return myCourses[this.courseIndex];
		},
		submission_list: function(){
			if(this.isAvailable){
			var assignments = this.submissions[this.submissionIndex].assignments;
			var res = [];
			for(var i=0; i<assignments.length; i++){
				var assid = parseInt(assignments[i]) - 1;
				var name = myCourses[this.courseIndex].assignments[assid].name;
				res.push({id: assid+1, name: name});
			}
			return res;
		 }
		}
	}
});



if(courseID && studentID && submittedvm.isAvailable){
	$('#submitted-details').css('display', 'block');
}else{
	$('#submitted-container').load('404.html');
}

