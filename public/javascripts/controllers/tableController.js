app.controller('tableController', ['$scope', '$http', '$resource', '$filter', function($scope, $http, $resource, $filter){

	$scope.getEntries = function(){
		// $http.get('/api/entries').then(function(response){
		$http.get('/api/user').then(function(response){
			$scope.entries = response.data;

			// filter by current month then add results by earnings + tips
			$scope.getMonthlyEarnings = function(monthlyEarnings){
				var monthlyEarnings = 0;
		    var filter = filterBy = $filter('filter');
		    var dateFilter = $filter('date');
		    var thisMonth = dateFilter(new Date(), 'MM');

		    $scope.filteredMonthEntries = filter($scope.entries, {createdAt: thisMonth})

				for(var i = 0; i < $scope.filteredMonthEntries.length; i++){
				  var entry = $scope.filteredMonthEntries[i];
	        monthlyEarnings += (entry.payout + entry.tips);
		    }
		    return monthlyEarnings.toFixed(2);
			}

			// filter by current month then add results by tips
			$scope.getMonthlyTips = function(monthlyTips){
				var monthlyTips = 0;
		    var filter = filterBy = $filter('filter');
		    var dateFilter = $filter('date');
		    var thisMonth = dateFilter(new Date(), 'MM');

		    $scope.filteredMonthEntries = filter($scope.entries, {createdAt: thisMonth})

				for(var i = 0; i < $scope.filteredMonthEntries.length; i++){
				  var entry = $scope.filteredMonthEntries[i];
	        monthlyTips += (entry.tips);
		    }
		    return monthlyTips.toFixed(2);
			}

			// add results by earnings + tips
			$scope.getTotalEarnings = function(){
				var totalPayout = 0;
		    for(var i = 0; i < $scope.entries.length; i++){
	        var entry = $scope.entries[i];
	        totalPayout += (entry.payout + entry.tips);
		    }
		    return totalPayout.toFixed(2);
			}

			// add all tips
			$scope.getTotalTips = function(){
				var totalTips = 0;
				for(var i = 0; i < $scope.entries.length; i++){
				  var entry = $scope.entries[i];
	        totalTips += (entry.tips);
		    }
		    return totalTips.toFixed(2);
			}

			// add miles by current month
			$scope.getMonthlyMiles = function(monthlyMiles){
				var monthlyMiles = 0;
		    var filter = filterBy = $filter('filter');
		    var dateFilter = $filter('date');
		    var thisMonth = dateFilter(new Date(), 'MM');

		    $scope.filteredMonthEntries = filter($scope.entries, {createdAt: thisMonth})

				for(var i = 0; i < $scope.filteredMonthEntries.length; i++){
				  var entry = $scope.filteredMonthEntries[i];
	        monthlyMiles += (entry.miles);
		    }
		    return monthlyMiles;
			}

			// add all miles
			$scope.getTotalMiles = function(){
				var totalMiles = 0;
				for(var i = 0; i < $scope.entries.length; i++){
				  var entry = $scope.entries[i];
	        totalMiles += (entry.miles);
		    }
		    return totalMiles;
			}

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
		    var n = Math.ceil(monthlyPerHour);
		    return n;
			}


		}); // end http.get req to api

	}, function(error){
		alert('There was a problem getting your entry: ' + error.message);
	};


	///////// EDIT entry /////////////
	// stash to put the editMode items in
	$scope.editMode = [];
	$scope.editEntry = function(index){
		// put the original entry into the editMode arr using angular.copy
		// this evaluates editMode to true & holds a copy of the original value in case we press cancel
		$scope.editMode[index] = angular.copy($scope.entries[index]);

	}

	$scope.cancelUpdate = function(index){
		// bring in the copy of the original value & exit editMode
		$scope.entries[index] = angular.copy($scope.editMode[index]);
		$scope.editMode[index] = false;
	}

	////////////////// SAVE UPDATE /////////////
	// take the data from the view (entry is the form data)
	$scope.saveUpdate = function(id, index, entry){
		// and pass it into the post request
		$http.post('/api/entry/' + id, {
				// date: entry.createdAt,
				hours: entry.hours,
				miles: entry.miles,
				payout: entry.payout,
				tips: entry.tips,
				income: entry.income
			})
			.then(function(res, status){
				console.log(res.data);
			})
			.catch(function(err){
				alert('There was a problem saving your entry: ' + err.data);
			});
		$scope.editMode[index] = false;
		// then update page with remaining entries
	  $http.get('/api/entries').then(function(response){
			$scope.entries = response.data;
		});
	}

	// DELETE entry
	// TODO: make sure this deletes from User model too!
  $scope.deleteEntry = function(id) {
    // delete entry from DB using clicked listing's id
    console.log(id);
    $http.delete('/api/entry/' + id)
      .success(function(data) {  // TODO: change to .then
          $scope.entry = data;
      })
      .error(function(data) {  // TODO: change to .catch
          console.log('Error: ' + data);
      });

    // delete from the user's entries array too
    $http.delete('/api/user')
    	.then(function(data){
    		console.log('Entry deleted from User model!!');
    	})
    	.catch(function(data){
    		console.log('Error deleting entry from User' + data);
    	});

    // finally, update page with remaining entries
    $http.get('/api/entries').then(function(response){
			$scope.entries = response.data;
		});
	};

}]);
