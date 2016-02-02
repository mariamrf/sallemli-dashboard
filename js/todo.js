var todovm = new Vue({
	el: '#todo-details',
	data: {
		todos: myAssignments
	}
});

var subvm = new Vue({
	el: '#done-details',
	data: {
		submitted: mySubmissions
	}
});