Vue.config.debug = true;

var query = document.URL.split('?')[1];
if(query != undefined){
var courseID, assignmentID;
if(query.split('&')[0]==undefined) courseID = query;
else {courseID=query.split('&')[0]; assignmentID = parseInt(query.split('&')[1]); }//relative to course, that's why we need both, unless there's a unique id generated for each assignment..

}

var sheetvm = new Vue({
	el: '#sheet-details',
	data: {
		all_courses: myCourses
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
			else if(!this.all_courses[this.courseIndex].assignments[assignmentID-1]) return false;
			else return true;
		},
		assignmentIndex: function(){
			return assignmentID-1;
		},
		submissions: function(){
			var res = [];
			var st, name;
			for(var i=0; i<allSubmissions.length; i++){
				if(allSubmissions[i].course.toLowerCase() == courseID.toLowerCase()){
					for(var j=0; j<allSubmissions[i].assignments.length; j++){
						if(parseInt(allSubmissions[i].assignments[j])==assignmentID){
								st = allSubmissions[i].student;
							for(var k=0; k<allStudents.length; k++){
								if(allStudents[k].id == st){
									name = allStudents[k].name;
								}
							}
								res.push({id: st, name: name});
						}
					}
				}
			}
			return res;
		}
	}
});

$('#submit-assignment-button').click(function(e){
e.preventDefault();
//validate and send to db/backend
$('#submitAssignment').modal('toggle');
});

$('.delete-this-assignment').click(function(){
	//delete assignment and maybe redirect because after deletion the page will 404
	$('#deleteAssignment').modal('toggle');
	
});
$('.cancel-this-assignment').click(function(){
	
	$('#deleteAssignment').modal('toggle');
});

if(query==undefined ||courseID == undefined || courseID == "" || assignmentID==undefined || assignmentID==""|| Number.isNaN(assignmentID)|| !sheetvm.isAvailable){
	$('#sheet-container').load('404.html');
}
else{
	$('#sheet-details').css('display', 'block');
}
