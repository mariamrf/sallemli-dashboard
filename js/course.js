var courseID = document.URL.split('?')[1];
if(courseID == undefined){
	$('#course-container').load('400.html');
}
