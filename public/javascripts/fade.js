$(document).ready(function(){
	wait();
});


function wait(){
	setTimeout(flash_fade, 2000);
}

function flash_fade(){
	$('.flash-container').fadeOut('fast');
}