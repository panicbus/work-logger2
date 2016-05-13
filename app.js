var flash                 = require("connect-flash");
var express  							= require('express');
var	app 		 							= express();
var	path 		 							= require('path');
var	ejs 		 							= require('ejs');
var cookieParser 					= require('cookie-parser');
var bodyParser            = require('body-parser');
var	nodemon  							= require('nodemon');
var	mongoose 							= require('mongoose');
var	passport              = require("passport");
var LocalStrategy         = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride        = require("method-override");
var session 							= require('express-session');
var util 									= require('util');
var favicon               = require('serve-favicon');
// is this User needed here?
var	User 			      = require('./models/user');

var config 					= require('./config'),
		setupController = require('./controllers/setupController'),
		apiController 	= require('./controllers/apiController'),
		htmlController 	= require('./controllers/htmlController');

var port = process.env.PORT || 3000;

// var	indexRoutes = require('./routes/index'),
var userRoutes = require('./routes/users');


// for views
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets', express.static(__dirname + '/public'));
// bring in the public directory -- remember to require('path')
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));


/// TODO: NEEDED?? //
app.use(methodOverride("_method"));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// passport setup //
app.use(require('express-session')({
  secret:"kthxbye",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(cookieParser());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser());
app.use(flash());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// app.use(indexRoutes);
app.use(userRoutes);

// TODO: can i remove?
// render the main page
app.get('/', function(req, res){
  res.render('index');
});


mongoose.connect(config.getDbConnectionString());

htmlController(app);
setupController(app);
apiController(app);

// TODO: re-add?
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.listen(port);
