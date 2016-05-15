app.controller('chartController', ['$scope', '$http', '$resource', '$filter', function($scope, $http, $resource, $filter){

  $scope.addChart = function(){
		$scope.getEntriesForChart = function(){

			$http.get('/api/user').then(function(response){
				$scope.entries = response.data;
		 		// add wages per hour by current month
				$scope.getMonthlyPerHour = function(monthlyPerHour){
					var monthlyPerHour = 0;
			    var filter = filterBy = $filter('filter');
			    var dateFilter = $filter('date');
			    var thisMonth = dateFilter(new Date(), 'MM');

			    $scope.filteredMonthEntries = filter($scope.entries, {createdAt: thisMonth})
			    console.log('filteredMonthEntries.length' + $scope.filteredMonthEntries.length)
					for(var i = 0; i < $scope.filteredMonthEntries.length; i++){
					  var entry = $scope.filteredMonthEntries[i];
		        monthlyPerHour += ((entry.payout + entry.tips) / (entry.hours));
			    }
			    var dividedTotal = monthlyPerHour / $scope.filteredMonthEntries.length;
			    var n = Math.ceil(dividedTotal);

				  var pieData = [
				     {
				        value: n,
				        label: 'Per hour',
				        color: '#1abc9c'
				     },
				     {
				        value: 30 - n,
				        label: 'nothing',
				        color: '#9CBABA'
				     }
				  ];
				  var canvas = document.getElementById("canvasEl");
					var context = canvas.getContext('2d');
				  var skillsChart = new Chart(context).Pie(pieData);
				};
			})
		};
	}


}]);

    // $http.get('https://api.myjson.com/bins/1chr1').success(function(data2) {
    //   $scope.data = [];
    //   data2.forEach(function(r) {
    //     $scope.data.push({
    //       'value': r.score,
    //       'color': '#F7464A',
    //       'highlight': '#FF5A5E',
    //       'label': r.name
    //     });
    //   });
    // });


    // $scope.options = {

    //   // Sets the chart to be responsive
    //   responsive: true,

    //   //Boolean - Whether we should show a stroke on each segment
    //   segmentShowStroke: true,

    //   //String - The colour of each segment stroke
    //   segmentStrokeColor: '#ccc',

    //   //Number - The width of each segment stroke
    //   segmentStrokeWidth: 2,

    //   //Number - The percentage of the chart that we cut out of the middle
    //   percentageInnerCutout: 50, // This is 0 for Pie charts

    //   //Number - Amount of animation steps
    //   animationSteps: 100,

    //   //String - Animation easing effect
    //   animationEasing: 'easeOutBounce',

    //   //Boolean - Whether we animate the rotation of the Doughnut
    //   animateRotate: true,

    //   //Boolean - Whether we animate scaling the Doughnut from the centre
    //   animateScale: false,

    //   // //String - A legend template
    //   // legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

    // };

