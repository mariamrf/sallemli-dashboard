Vue.config.debug = true;
var courseID = document.URL.split('?')[1];
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
		}
	},
	methods: {
		
	}
});
var modalvm = new Vue({
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

$('.delete-this').click(function(){
	//delete course and maybe redirect because after deletion the page will 404
	$('#deleteCourse').modal('toggle');
	
});

$('.cancel-this').click(function(){
	
	$('#deleteCourse').modal('toggle');
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


