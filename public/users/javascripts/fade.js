$(document).ready(function(){
	wait();
});

function wait(){
	setTimeout(flash_fade, 2000);
}

function flash_fade(){
	$('.flash-container').animate({ top: '-10', opacity: 'toggle' }, 'slow');
}
