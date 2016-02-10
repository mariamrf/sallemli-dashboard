Vue.config.debug = true;
var courseID;
if(document.URL.indexOf('#')!=-1){
	courseID = document.URL.split('?')[1].split('#')[0];
}
else{
	courseID = document.URL.split('?')[1];
}

var coursevm = new Vue({
	el: '#course-details',
	data: {
		all_courses: myCourses, //until we add more not-my-courses
		filtered: false
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
		},
		teachers: function(){
			return this.all_courses[this.courseIndex].teachers;
		},
		hasAssignments: function(){
			if(this.all_courses[this.courseIndex].assignments && this.all_courses[this.courseIndex].assignments.length>0) return true;
			else return false;
		},
		messages: function(){
			var res = [];
			for(var i=0; i<allMessages.length; i++){
				if(allMessages[i].course.toLowerCase() == courseID.toLowerCase())
					res.push(allMessages[i]);
			}
			return res;
		},
		hasMessages: function(){
			if(this.messages && this.messages.length>0)
				return true;
			else
				return false;
		},
		hiddenResolved: function(){
			if(this.filtered) return true;
			else return false;
		}
	},
	methods: {
		isNew: function(message){
			for(var i=0; i<message.thread.length; i++){
				if(!message.thread[i].seen) return true;
			}
			return false; //if all of this doesn't return
		},
		markSeen: function(message){
			if(this.isNew(message)){
				for(var i=0; i<message.thread.length; i++){
					if(!message.thread[i].seen) message.thread[i].seen = true;
				}
			}
		},
		resolve: function(message){
			message.resolved = !message.resolved;
			if(this.filtered && message.resolved){
				setTimeout(filterResolved, 1000); //wait until class is changed, also good for ux so they don't click on it and then lose the message
			}
		},
		togglehide: function(){
			this.filtered = !this.filtered;
			filterResolved();
			
		},
		replyNow: function(message){
			var r = message.reply;
			if(r && r.length>0){
				message.thread.push({date: moment(), sender: 'Jane Doe', message: r, seen: true}); //and add to db. SEEN here is relative to the logged in user, which is always true
				setTimeout(linkifyMessages, 50);
			}
		}
	}
});

function linkifyMessages(){
	$('.one-message').linkify({
	target: "_blank"
});
}

linkifyMessages();


$('.message-reply').click(function(){
	var par = $(this).parent().parent();
	$('.message-reply-area', par).val('');
});

function filterResolved(){
	$('.one-message').each(function(){
				if($(this).hasClass('resolved-true') && coursevm.filtered){
					$(this).css('display', 'none');
				}
				else if($(this).hasClass('resolved-true') && !coursevm.filtered){
					$(this).css('display', 'block');
				}
	});
}

$('a[href^="#"]').click(function(e){
	e.preventDefault();
});
var editcoursevm = new Vue({
	el: '#editCourse',
	computed: {
		name: function(){
			if(coursevm.isAvailable)
				return myCourses[coursevm.courseIndex].name;
		},
		description: function(){
			if(coursevm.isAvailable)
				return myCourses[coursevm.courseIndex].desc;
		}
	},
	methods: {
		editCourse: function(){
			if(coursevm.isAvailable){
				if(coursevm.all_courses[coursevm.courseIndex].teacher){
					var name = $('#new-name').val();
					var desc = $('#description-edit').val();
					coursevm.all_courses[coursevm.courseIndex].name = name;
					coursevm.all_courses[coursevm.courseIndex].desc = desc;
					$('#editCourse').modal('toggle');
				}
			}
		}
	}
});
$('#editCourseSubmit').click(function(){
	
});
var submitAssignmentvm = new Vue({
	el: '#submitAssignment',
	computed: {
		unsubmitted: function(){
			if(coursevm.isAvailable){
			// JANE DOE IS STUDENT 2362
			var sheets = []; //initial values because vue..
			if(coursevm.all_courses[coursevm.courseIndex].assignments){
				var all = coursevm.all_courses[coursevm.courseIndex].assignments.slice();
			for(var i=0; i<allSubmissions.length; i++){
				if(allSubmissions[i].student=='2362' && allSubmissions[i].course.toLowerCase() == courseID.toLowerCase())
					sheets.push(allSubmissions[i].assignments);
			}
			if(sheets[0]){ //if Jane Doe submitted any assignments for this course
				for(var i=0; i<all.length; i++){
					for(var k=0; k<sheets[0].length; k++){
						if(sheets[0][k]==all[i].id){
							all.splice(i, 1);
						}
					}
				}
			}
				return all;
			
			}
			}
		},
		hasUnsubs: function(){
			if(coursevm.isAvailable){
			if(this.unsubmitted && this.unsubmitted.length>0) return true;
			else return false;
		}
		}
	},
	methods: {
		submitAssignment: function(e){
			e.preventDefault();
			//submit and validate existence of everything
			$('#submitAssignment').modal('toggle');
		}
	}
});

var removeTeachervm = new Vue({
	el: '#removeTeacher',
	data: {
		teacher: 'error'
	},
	computed: {
		teacherName: function(){
			if(coursevm.isAvailable){
			for(var i=0; i<coursevm.teachers.length; i++){
				if(coursevm.isAvailable){
					if(coursevm.teachers[i].id == this.teacher)
					return coursevm.teachers[i].name;
				}
				
			}
		}
		},
		teacherIndex: function(){
			if(coursevm.isAvailable){
			for(var i=0; i<coursevm.teachers.length; i++){
				if(coursevm.isAvailable){
					if(coursevm.teachers[i].id == this.teacher)
					return i;
				}
				
			}
		}
	}
	},
	methods: {
		removeTeacher: function(){
			if(coursevm.isAvailable){
			coursevm.teachers.splice(this.teacherIndex, 1); //and remove from db etc
			$('#removeTeacher').modal('toggle');
		}
	}
	}
});

$('.show-message-all').click(function(){
	var leparent = $(this).parent();
	if(leparent.hasClass('expanded')){
		leparent.removeClass('expanded');
		$('.message-content', leparent).slideUp();
		$('.show-message', leparent).html('<i class="fa fa-angle-double-right"></i>Show message');

	}
	else{
		leparent.addClass('expanded');
		$('.message-content', leparent).slideDown();
		$('.show-message', leparent).html('<i class="fa fa-angle-double-down"></i>Hide message');
	}
	
});

$('#add-assignment-button').click(function(e){
	e.preventDefault(); 
//check to see all is OK, name doesn't have to be in any way unique but it has to have a name, a due date and a file so all is required
//date has to be in the future, but within the semester if semesters end up being a thing
console.log("Front end developer here so..yeah..");
$('#addAssignment').modal('toggle');
});

$('#add-teacher-button').click(function(e){
	e.preventDefault();
	var value = $('#teacher-email').val();
	var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|me|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
	if(emailRegex.test(value)){
		$('#email-form-group').removeClass('has-error');
		$('#teacher-email').val('');
		$('#addTeacher').modal('toggle');
	}
	else{
		$('#email-form-group').addClass('has-error');
	}
});

$('.delete-this-course').click(function(){
	//delete course and maybe redirect because after deletion the page will 404
	$('#deleteCourse').modal('toggle');
	
});
$('.cancel-this-course').click(function(){
	
	$('#deleteCourse').modal('toggle');
});


$('.remove-teacher-button').click(function(){
	removeTeachervm.teacher = $(this).attr('id');
	$('#removeTeacher').modal('show');
});

$('.delete-this-teacher').click(function(){
	
});

$('.cancel-this-teacher').click(function(){
	
	$('#removeTeacher').modal('toggle');
});

function hasSubs(id){
	if(coursevm.isAvailable){
			var flag=false;
				for(var j=0; j<allSubmissions.length; j++){
					if(allSubmissions[j].student.toLowerCase() == id && allSubmissions[j].course.toLowerCase()==courseID.toLowerCase())
					 {flag=true; break;}
				}
	
			return flag;
	}
};

$('.student-list').each(function(){
	var sID = $(this).attr('id');
	var subs = 'view-subs-' + sID;
	if(!hasSubs(sID)){
		$('#'+subs).empty();
		$('#'+subs).append('<span style="text-transform: uppercase; color: red;">No submissions yet</span>');
	}
});

if(document.location.search.length != 0){ //why this doesn't work as expected I will never know
	if(courseID && coursevm.isAvailable){
	$('#course-details').css('display', 'block');
} else {
	$('#course-container').load('404.html');
}
}else{
	$('#course-container').load('404.html');
}


