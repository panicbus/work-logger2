var express  							= require('express'),
		app 		 							= express(),
		ejs 		 							= require('ejs'),
		nodemon  							= require('nodemon'),
		mongoose 							= require('mongoose'),
		path 		 							= require('path'),
    bodyParser            = require('body-parser'),
		passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride        = require("method-override"),
    flash                 = require("connect-flash"),
	  User 			      = require('./models/user');

var config 					= require('./config'),
		setupController = require('./controllers/setupController'),
		apiController 	= require('./controllers/apiController'),
		htmlController 	= require('./controllers/htmlController');

var port = process.env.PORT || 3000;

var	indexRoutes = require('./routes/index'),
		userRoutes 	= require('./routes/users');

// for views
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use('/assets', express.static(__dirname + '/public'));
// bring in the public directory -- remember to require('path')
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride("_method"));
app.use(flash());
app.use(indexRoutes);
app.use(userRoutes);


// passport setup //
app.use(require('express-session')({
  secret:"elementalair",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});
// end passport authentication



// render the main page
app.get('/', function(req, res){
  res.render('index');
})
// render the success('table') page
app.get('/table', function(req, res){
  res.render('table');
})


mongoose.connect(config.getDbConnectionString());

htmlController(app);
setupController(app);
apiController(app);



app.listen(port);