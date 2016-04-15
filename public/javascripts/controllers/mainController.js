app.controller('mainController', ['$scope', '$http', '$resource', function($scope, $http, $resource){

	/// did this last night
	// $scope.getUser = function(id){

	// 	$http.get('api/users/'+ id).then(function(res){
	// 		$scope.user = res.data;
	// 	})
	// 	.cath(function(err){
	// 		alert('There was a problem getting the user info' + err.data);
	// 	});
	// 	alert('getUser _id ' + _id)
	// }





	////////////////// POST FROM MAIN FORM WITH USER_ID /////////////
	// $scope.postEntry = function(id, entry){
	// 	alert('kablammo postEntry id is ' + id);
	// 	console.log('postEntry id is ' + id);
	// 	console.log(_id);
	// 	$http.post('/api/entries/' + id, {
	// 			date: entry.date,
	// 			hours: entry.hours,
	// 			income: entry.income,
	// 			payout: entry.payout,
	// 			tips: entry.tips,
	// 			user_id: entry.id
	// 		})
	// 		.then(function(res, status){
	// 			console.log(res.data);
	// 		})
	// 		.catch(function(err){
	// 			alert('There was a problem saving your entry: ' + err.data);
	// 			console.log('There was a problem saving your entry: ' + err.data);
	// 		});
	// 	// then update page with remaining entries
	//   $http.get('/api/entries/:user_id').then(function(response){
	// 		$scope.entries = response.data;
	// 	});
	// }

}]);

