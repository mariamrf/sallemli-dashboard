$('#add-course-form').submit(function(e){
	e.preventDefault();
	addCourse();
});

$('#course-id').keyup(function(e){
	if(!validateID(e.keyCode) && !$('#course-id-form-group').hasClass('has-error')) {
	$('#course-id-form-group').addClass('has-error').prepend('<span id="course-id-error" style="margin-left:1em;color:#a32723; font-weight: bold;">ID cannot contain spaces or special characters.</span>');

	}
	else if(validateID() && $('#course-id-form-group').hasClass('has-error')){
		$('#course-id-form-group').removeClass('has-error');
		$('#course-id-error').remove();
	}
})

function addCourse(){
	var name = $('#course-name').val();
	var id = $('#course-id').val(); //left it here for the request to server
	var school = $('#course-school').val();
	var desc = $('#course-desc').val();
	if(!name || !id || !school || !desc){
		alert("All fields are required!");
	}
	else{
	if(validateID()){
		//add course
		alert("Successfully added!");
		//redirect to course page based on ID
	}
	else{
		$('#course-id-form-group').addClass('has-error').prepend('<span id="course-id-error" style="margin-left:1em;color:#a32723; font-weight: bold;">ID cannot contain spaces or special characters.</span>');
	}
	}
	
}

function validateID(){
	var idRegex = /^[a-zA-Z0-9]*$/;
	var id = $('#course-id').val();
	if(idRegex.test(id)){
		return true;
	}else{return false;}
}