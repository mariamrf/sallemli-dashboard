//Vue.config.debug = true;


var alertsvm = new Vue({
	el: '#alerts-container',
	data: {
		requests: allRequests,
		seen: lastSeen
	},
	computed:{
		hasRequests: function(){
			if(this.requests.length>0) return true;
			else return false;
		}
	},
	methods:{
		isNew: function(alert){
			if(alert.date>this.seen) return true;
			else return false;
		},
		accept: function(requestIndex){
			alert("Accepted!"); //accept function here to add as teacher to course
			this.requests.splice(requestIndex, 1);
		},
		dismiss: function(requestIndex){
			this.requests.splice(requestIndex, 1);
		}
	}
});

/*$('.one-message').each(function(){
	if($('.alert-header i', this).hasClass('fa-asterisk')) $(this).css('border-color', 'red');
});
$('.one-message').click(function(){
	if($(this).hasClass('expanded')){
		$(this).removeClass('expanded');
		$('.message-content', this).slideUp();
		$('.show-message', this).html('<i class="fa fa-angle-double-right"></i>Show message');

	}
	else{
		$(this).addClass('expanded');
		$('.message-content', this).slideDown();
		$('.show-message', this).html('<i class="fa fa-angle-double-down"></i>Hide message');
	}
	
});
	
*/

$('.one-request').each(function(){
	if($('.alert-header i', this).hasClass('fa-asterisk')) $(this).css('border-color', 'red'); //two separate just in case we change the icons or something
});


