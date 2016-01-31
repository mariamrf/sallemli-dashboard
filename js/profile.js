
var profilevm = new Vue({
	el: '#profile',
	data: {
		name: 'Jane Doe',
		password: 'happy',
		properties: [
		{name: 'Student ID', value: '2361', color: '#331B17', icon: 'fa-rocket', edit: 'editable', method: 'editID', editable: true},
		{name: 'School', value: 'Lorem Ipsum Academy', color: '#7f4339', icon: 'fa-graduation-cap', edit: 'editable', method: 'editSchool', editable: true},
		{name: 'E-mail', value: 'jane@doe.edu', color: '#42787A', icon: 'fa-envelope', edit: 'editable', method: 'editEmail', editable: true},
		{name: 'Member Since', value: '31-01-2016', color: '#409C97', icon: 'fa-calendar-o', edit: 'not-editable', method: 'none', editable: false} //Get Date object from server and convert it using moment.js
		]
	}
	
});
var changeNamevm = new Vue({
	el: '#changeName',
	methods: {
		changeName: function(e){
			e.preventDefault();
			var name = $('#new-name').val();
			if(name==""){alert("Must add a name!");}
			else{
				//send request to admins/this person's teacher if available with the reason
			alert("Sent request!");
			$('#changeName').modal('toggle');
			}
			
		}
	}
});

var changePWvm = new Vue({
	el: '#changePW',
	methods: {
		changePassword: function(e){
			e.preventDefault();
			//first validate old password
			var old = $('#oldpassword').val();
			if(old == profilevm.password){ //Insert actual validation against hashed password here (or you know, at the server)
				var new1 = $('#newpassword1').val();
				var new2 = $('#newpassword2').val();
				if(new1 == new2){
					profilevm.password = new1; //Insert actual function here to reset password
					$('#oldpassword').val('');
					$('#newpassword1').val('');
					$('#newpassword2').val('');
					$('#changePW').modal('toggle');
				}
				else
					alert("New password doesn't match!");
			}
			else
				alert("The old password isn't correct!");
		}
	}
});


 $('#editID').editable(function(value, settings) {
 				if(value==""){
 					return profilevm.properties[0].value;
 				}
 				else{
 					//validate ID if available
			     profilevm.properties[0].value = value; //and change in db
			     return value;
			 }
			  }, {
			     type    : 'text',
			     //width: 300,
			     style: 'display: inline;',
			     onblur: 'submit'
			 });
 $('#editSchool').editable(function(value, settings) {
 				if(value==""){ return profilevm.properties[1].value;}
 				else{
 					//validate school if available
 					profilevm.properties[1].value = value; //and change in db
			     return value;
 				}
			     
			  }, {
			     type    : 'text',
			     //width: 300,
			     style: 'display: inline;',
			     onblur: 'submit'
			 });
 $('#editEmail').editable(function(value, settings) {
 				if(value==""){return profilevm.properties[2].value;}
 				else{
 					//check for email in db too
 				var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|me|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
 				if(emailRegex.test(value)){profilevm.properties[2].value = value; //and change in db
			     return value;}
			     else{alert("Invalid email!"); return profilevm.properties[2].value;}
 				}
			  }, {
			     type    : 'text',
			     //width: 300,
			     style: 'display: inline;',
			     onblur: 'submit'
			 });
