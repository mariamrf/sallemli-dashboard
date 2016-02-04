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
		all_courses: myCourses //until we add more not-my-courses
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
		}
	}
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
		editCourse: function(e){
			e.preventDefault();
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

var submitAssignmentvm = new Vue({
	el: '#submitAssignment',
	computed: {
		unsubmitted: function(){
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
			
		},
		hasUnsubs: function(){
			if(this.unsubmitted && this.unsubmitted.length>0) return true;
			else return false;
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
			for(var i=0; i<coursevm.teachers.length; i++){
				if(coursevm.isAvailable){
					if(coursevm.teachers[i].id == this.teacher)
					return coursevm.teachers[i].name;
				}
				
			}
		},
		teacherIndex: function(){
			for(var i=0; i<coursevm.teachers.length; i++){
				if(coursevm.isAvailable){
					if(coursevm.teachers[i].id == this.teacher)
					return i;
				}
				
			}
		}
	},
	methods: {
		removeTeacher: function(){
			coursevm.teachers.splice(this.teacherIndex, 1); //and remove from db etc
			$('#removeTeacher').modal('toggle');
		}
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
			var flag=false;
				for(var j=0; j<allSubmissions.length; j++){
					if(allSubmissions[j].student.toLowerCase() == id && allSubmissions[j].course.toLowerCase()==courseID.toLowerCase())
					 {flag=true; break;}
				}
	
			return flag;
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


