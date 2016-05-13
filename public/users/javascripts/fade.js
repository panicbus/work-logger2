// js fade for login
$(document).ready(function(){
	wait();
	electric_slide();
});

function wait(){
	setTimeout(flash_fade, 2000);
}

function flash_fade(){
	$('.flash-container').animate({ top: '-10', opacity: 'toggle' }, 'slow');
}

function electric_slide(){
	$('.calculations-box').animate({ top: '20', opacity: 'toggle'}, 'fast');
}
