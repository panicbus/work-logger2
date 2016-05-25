var express    = require('express'),
  router 		   = express.Router(),
  passport     = require('passport'),
  User         = require('../models/user'),
  isLoggedIn   = require("../middleware/isLoggedIn"),
  bodyParser   = require('body-parser');

var authMiddleware = passport.authenticate('local', {failureRedirect:'/login'});

router.get('/users/:id', function(req, res) {
	console.log(req.params.id)
      // TODO: /userController doesn't exist anymore!!
  User.findById({ _id: req.params.id }).exec(function(err, user) {
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


// USER AUTHENTICATION
// REGISTER
router.get('/register', function(req, res){
	res.render('auth/register');
})

router.post('/register', function(req, res) {

  var newUser  = new User({username : req.body.username}),
    password = req.body.password;

  User.register(newUser, password, function(err,user){
    if(err){
      console.log('Failed to register user...');
      console.log(err);
      req.flash('error', err.message);
      return res.render('index');
    }
    else{
      console.log('user registered successfully...');
      console.log('user.username: ' + user.username);
      console.log('user LOOKING FOR ID: ' + user._id);
      // uses the flash container in index.ejs
      req.flash('success', 'Welcome, ' + user.username + '!');

      res.redirect('/');
      // res.redirect('/users/' + user._id);
    }
  });
});

//  LOGIN
router.get('/login', function(req, res) {
    res.render('auth/login');
});

router.post('/login', authMiddleware, function(req, res){
    req.flash('success', 'Welcome back, ' + req.user.username + '!');
    // req.flash('error', 'There was an error logging in.' );
    res.redirect('/users/' + req.user._id);
});

// LOGOUT
router.get('/logout', function(req, res) {
    req.logout();
    console.log('User has been logged out... redirecting back to home');
    req.flash('success','You\'ve been logged out.');
    res.redirect('/login');
});


module.exports = router;