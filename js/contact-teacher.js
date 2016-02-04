$('#contact-teacher-button').click(function(e){
	e.preventDefault();
	//send message and clear fields, verify all is in there and all
	$('#contactTeacher').modal('toggle');
});
