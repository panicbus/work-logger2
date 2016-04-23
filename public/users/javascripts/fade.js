$(document).ready(function(){
	wait();
});


function wait(){
	// alert('wait function')
	setTimeout(flash_fade, 2000);
}

function flash_fade(){
	// alert('flash_fade')
	$('.flash-container').fadeOut('fast');
}