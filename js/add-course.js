$('#add-course-form').submit(function(e){
	e.preventDefault();
	addCourse();
});

function addCourse(){
	var name = $('#course-name').val();
	var id = $('#course-id').val();
	var school = $('#course-school').val();
	var desc = $('#course-desc').val();
	var idRegex = /^[a-zA-Z0-9]*$/;
	if(!name || !id || !school || !desc){
		alert("All fields are required!");
	}
	else{
	if(idRegex.test(id)){
		//add course
		alert("Successfully added!");
		//redirect to course page based on ID
	}
	else{
		$('#course-id-form-group').addClass('has-error').prepend('<span style="margin-left:1em;color:#a32723; font-weight: bold;">ID cannot contain spaces or special characters.</span>');
	}
	}
	
}