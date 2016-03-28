app.controller('tableController', ['$scope', '$http', '$resource', function($scope, $http, $resource){

	$scope.getEntries = function(){
		$http.get('/api/entries').then(function(response){
			$scope.entries = response.data;
		});

	}, function(error){
		alert('There was a problem getting your entry: ' + error.message);
	};


	// DELETE entry
  $scope.deleteEntry = function(id) {
    // delete entry from DB using clicked listing's id
    $http.delete('/api/entry/' + id)
      .success(function(data) {
          $scope.entry = data;
      })
      .error(function(data) {
          console.log('Error: ' + data);
      });
    // then update page with remaining entries
    $http.get('/api/entries').then(function(response){
			$scope.entries = response.data;
		});

	};

}]);
