var express 					= require('express'),
		router 						= express.Router(),
		passport          = require("passport"),
    User              = require('../models/user'),
    authMiddleware    = passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'home' });
});

router.get('/table', function(req, res, next){
	res.render('table', { title: 'table' })
})

// For user authenticaion
router.post('/register', function(req, res) {
    var newUser  = new User({username:req.body.username}),
        password = req.body.password;

    User.register(newUser, password, function(err,user){
        if(err){
            console.log('Failed to register user...');
            console.log(err);
            req.flash("error", err.message);
            return res.render('index');
        }
        else{
            console.log('user registered successfully...');
            req.flash("success", "Added " + user.username);
            res.redirect('/');
        }
    });
});

router.get('/login', function(req, res) {
    res.render('auth/login');
});

router.post('/login', function(req, res){
    res.redirect('/users/' + req.user._id);
});

router.get('/logout', function(req, res) {
    req.logout();
    console.log('User has been logged out...');
    req.flash('success','You have been logged out.');
    res.redirect('/');
});


module.exports = router;