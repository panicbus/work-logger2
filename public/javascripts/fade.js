// js fade for login
$(document).ready(function(){
	wait();
	electric_slide();
});

// function chartPrep() {
//     $("#showChart").click(function(){

//     	$("#chart").fadeToggle(2000, function(){
//     		console.log("Toggled!");
//     	});

//       addChart();
//     });
// }

function wait(){
	setTimeout(flash_fade, 2000);
	// setTimeout(electric_slide, 500);
	// setTimeout(chart_prep, 500);

}

function flash_fade(){
	$('.flash-container').animate({ top: '-10', opacity: 'toggle' }, 'slow');
}

// function electric_slide(){
// 	$('.calculations-box').animate({
// 		top: '+=75px',
// 		// opacity: -0.50,
// 		easing: 'ease-out'
// 	}, 500);
// 	// $('.calculations-box').animate({ top: '20', opacity: 'toggle'}, 'fast');
// }


// function addChart(){
//   var pieData = [
//      {
//         value: 25,
//         label: 'NO',
//         color: '#811BD6'
//      },
//      {
//         value: 10,
//         label: 'YES',
//         color: '#9CBABA'
//      },
//      {
//         value: 60,
//         label: '??',
//         color: '#1abc9c'
//      }
//   ];

//   var context = document.getElementById('chart').getContext('2d');
//   var skillsChart = new Chart(context).Pie(pieData);

// }