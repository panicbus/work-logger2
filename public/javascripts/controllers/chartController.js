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

			    for(var i = 0; i < $scope.filteredMonthEntries.length; i++){
					  var entry = $scope.filteredMonthEntries[i];
		        monthlyPerHour += ((entry.payout + entry.tips) / (entry.hours));
			    }
			    var dividedTotal = monthlyPerHour / $scope.filteredMonthEntries.length;
			    var n = Math.ceil(dividedTotal);

				  var donutData = [
						{
						  value: n,
						  label: 'Per hour',
						  color: '#1abc9c'
						},
						{
						  value: 30 - n,
						  color: '#ccffcc'
						}
				  ];

				  var canvas = document.getElementById('canvasEl');
					var context = canvas.getContext('2d');
					var myChart = new Chart(context);
				  myChart.Doughnut(donutData, {segmentStrokeColor: 'rgba(255, 255, 255, 0)'});
				};
			})
		};
	}


}]);


