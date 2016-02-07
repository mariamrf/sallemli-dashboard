Vue.config.debug = true;

$(document).ready(function(){
	lastSeen = moment();
	menuvm.seen = lastSeen;
	navmenuvm.seen = lastSeen;
});
$('#alerts-container a').attr('target', 'blank');
var alertsvm = new Vue({
	el: '#alerts-container',
	data: {
		alerts: alerts,
		seen: lastSeen
	},
	computed:{
		hasAlerts: function(){
			if(this.alerts.length>0) return true; //this assumes it will always exist but if there's no alerts it will just be empty
			else return false;
		}
	},
	methods:{
		isNew: function(alert){
			if(alert.date>this.seen) return true;
			else return false;
		},
		isRequest: function(alert){
			if(alert.type == 'R') return true;
			else return false;
		}
	}
});


	
