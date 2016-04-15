var express 					= require('express');
var router 						= express.Router();
var passport          = require('passport');
var User              = require('../models/user');
var authMiddleware    = passport.authenticate('local', {failureFlash: true, failureRedirect:'/login'});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'home' });
});

router.get('/table', function(req, res, next){
	res.render('table', { title: 'table' })
})

router.get('/table/user/:id', function(req, res, next){
  User.findById(req.params.id).populate('entries').exec(function(err, entries){
    if(err){
      console.log(err)
    } else {
      console.log(entries);
      res.render('table', { entries: entries})
    }
  })
})

// For user authenticaion
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
            req.flash('success', 'Added ' + user.username);
            res.redirect('/');
        }
    });
});

// LOGIN
router.get('/login', function(req, res) {
    res.render('auth/login');
});

router.post('/login', authMiddleware, function(req, res){
    res.redirect('/users/' + req.user._id);
});




// LOGOUT
router.get('/logout', function(req, res) {
    req.logout();
    console.log('User has been logged out... redirecting back to home');
    req.flash('success','You have been logged out.');
    res.redirect('/login');
});


// posting from main form
router.post('/index', function(req, res){
  res.redirect('/table/' + req.user.id);
});



module.exports = router;