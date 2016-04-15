var express 					= require('express'),
		router 						= express.Router(),
		passport          = require('passport'),
    User              = require('../models/user'),
    isLoggedIn     		= require("../middleware/isLoggedIn");

var authMiddleware    = passport.authenticate('local', {failureRedirect:'/login'});


router.get('/users', function(req, res) {
    res.render('index');
});

router.get('/users/:id', isLoggedIn, function(req, res) {
		console.log(req.params.id)
    User.findById({ _id: req.params.id }).populate('../userController').exec(function(err, user) {
			if(err){
				console.log(':user_id err ' + err);
			}
			else{
				console.log('found user: ' + user.id);
				// res.render('./table', {user: user});
				res.render('./index', {user: user});
			}
   });
});

module.exports = router;