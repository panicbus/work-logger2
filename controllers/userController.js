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

	// GET SPECIFIC USER
	app.get('/api/user/:id', function(req, res){
		Users.findById({ _id: req.params.id }, function(err, user){
			if (err) throw err;
			//comes back as json
			res.send(user);
		});
	});

}