Vue.config.debug = true;


var coursevm = new Vue({
	el: '#complaints-container',
	data: {
		filtered: false
	},
	computed: {
		messages: function(){
			var res = [];
			for(var i=0; i<allComplaints.length; i++){
					res.push(allComplaints[i]);
			}
			return res;
		},
		hasMessages: function(){
			if(this.messages && this.messages.length>0)
				return true;
			else
				return false;
		},
		hiddenResolved: function(){
			if(this.filtered) return true;
			else return false;
		}
	},
	methods: {
		isNew: function(message){
			for(var i=0; i<message.thread.length; i++){
				if(!message.thread[i].seen) return true;
			}
			return false; //if all of this doesn't return
		},
		markSeen: function(message){
			if(this.isNew(message)){
				for(var i=0; i<message.thread.length; i++){
					if(!message.thread[i].seen) message.thread[i].seen = true;
				}
			}
		},
		togglehide: function(){
			this.filtered = !this.filtered;
			filterResolved();
			
		},
		replyNow: function(message){
			var r = message.reply;
			if(r && r.length>0){
				message.thread.push({date: moment(), sender: 'Jane Doe', message: r, seen: true}); //and add to db. SEEN is relative to the logged in user
				setTimeout(linkifyMessages, 50);
			}
		}
	}
});

function linkifyMessages(){
	$('.one-message').linkify({
	target: "_blank"
});
}

linkifyMessages();


$('.message-reply').click(function(){
	var par = $(this).parent().parent();
	$('.message-reply-area', par).val('');
});

function filterResolved(){
	$('.one-complaint').each(function(){
				if($(this).hasClass('resolved-true') && coursevm.filtered){
					$(this).css('display', 'none');
				}
				else if($(this).hasClass('resolved-true') && !coursevm.filtered){
					$(this).css('display', 'block');
				}
	});
}

$('a[href^="#"]').click(function(e){
	e.preventDefault();
});


$('.show-message-all').click(function(){
	var leparent = $(this).parent();
	if(leparent.hasClass('expanded-complaint')){
		leparent.removeClass('expanded-complaint');
		$('.message-content', leparent).slideUp();
		$('.show-message', leparent).html('<i class="fa fa-angle-double-right"></i>Show message');

	}
	else{
		leparent.addClass('expanded-complaint');
		$('.message-content', leparent).slideDown();
		$('.show-message', leparent).html('<i class="fa fa-angle-double-down"></i>Hide message');
	}
	
});

