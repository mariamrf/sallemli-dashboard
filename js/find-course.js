$('#search-by').change(function(){
	$('.hide-me').css('display', '');
	var value = $('#search-by').val();
	var toshow;
	if(value=='id'){
		toshow = $('#search-id');
	}
	else if(value=='name'){
		toshow = $('#search-name');
	}
	else if(value=='school'){
		toshow = $('#search-school');
	}
	toshow.css('display', 'block');
});