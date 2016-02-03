var studying =[], teaching=[], test = [];
function separate(){
	for(var i=0; i<myCourses.length; i++){
		if(myCourses[i].teacher) teaching.push(myCourses[i]);
		else studying.push(myCourses[i]); 
	}
};
separate();


var studyvm = new Vue({
	el: '#study-details',
	data: {
		courses: studying
	},
	computed: {
		isAvailable: function(){
			if(this.courses.length==0) return false;
			else return true;
		}
	}
});

var teachingvm = new Vue({
	el: '#teaching-details',
	data: {
		courses: teaching
	},
	computed: {
		isAvailable: function(){
			if(this.courses.length==0) return false;
			else return true;
		}
	}
});

