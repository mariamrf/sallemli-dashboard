Vue.config.debug = true;
var queryphrase = document.URL.split('?q=')[1];

if(queryphrase==undefined || queryphrase==""){
	$('#search-container').load('404.html');
}else{
	$('#search-results').css('display', 'block');
}

var resultsvm = new Vue({
	el: '#search-results',
	computed: {
		query: function(){
			return decodeURIComponent(queryphrase);
		}
	}
});