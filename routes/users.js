var express 					= require('express'),
		router 						= express.Router(),
		passport          = require('passport'),
    User              = require('../models/user'),
    isLoggedIn     		= require("../middleware/isLoggedIn");

var authMiddleware    = passport.authenticate('local', {failureRedirect:'/login'});


router.get("/users", function(req, res) {
    res.render("index");
});

// router.get('/users/:id', function(req, res){
// 	console.log('params is: ' + req.params.id);
// 	console.log(req.params);
// 	User.findById({ _id: req.params.id }, function(err, user){
// 			if (err) throw err;
// 			// res.send(user)
// 		});
// 	// var user = req.body._id
// 	console.log('route users req.user is: ' + req.body);
//   res.redirect('/table/' + req.params.id);

// })



router.get("/users/:id", isLoggedIn, function(req, res) {
		console.log(req.params.id)
    User.findById({ _id: req.params.id }).populate('table').exec(function(err, user) {
			if(err){
				console.log(':user_id err ' + err);
			}
			else{
				console.log("found user: " + user.id);
				res.render("./table", {user: user});
				// res.redirect("/table", req.params.id);
			}
   });
});

module.exports = router;