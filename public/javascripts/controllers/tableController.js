app.controller('tableController', ['$scope', '$http', '$resource', function($scope, $http, $resource){

	$scope.getEntries = function(){

		$http.get('/api/entries').then(function(response){

			// return response.data;
			$scope.entries = response.data;

		});

	}, function(error){
		alert('There was a problem getting your entry: ' + error.message);
	};

}]);
