/// did this last night
var Users = require('../models/user');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

	// GET ALL USERS
	app.get('/api/users', function(req, res){
		// mongoose model
		Users.find(function(err, users){
			if (err) throw err;
			//comes back as json
			res.send(users);
		});
	});

	// // GET SPECIFIC USER
	// app.get('/api/user/:id', function(req, res){
	// 	Users.findById({ _id: req.params.id }, function(err, user){
	// 		if (err) throw err;
	// 		//comes back as json
	// 		res.send(user);
	// 	});
	// });

	// 4/14/16
	app.get('/table/user/:id', function(req, res, next){
		Users.findById({ _id: req.params.id }, function(err, user){
	    if(err){
	      console.log('the userController get err: ' + err)
	    } else {
	      console.log('user from router index: ' + user);
	      Users.find(req.body.entries._id, function(entries){
	        console.log('entries from router index: ' + entries);
	        res.send(entries);
	      });
	    }
	  })
	})

	// app.get('/api/user/:id', function(req, res){
	// 	// mongoose provides the findById method
	// 	// will be a single response so entry (singular)
	// 	Users.findById({ _id: req.params.entries._id }, function(err, user){
	// 		if (err) throw err;
	// 		res.send(user);
	// 	});
	// });




}