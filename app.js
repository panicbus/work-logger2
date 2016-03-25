var express = require('express');
var app = express();
var ejs = require('ejs');
var nodemon = require('nodemon');
var mongoose = require('mongoose');
var path = require('path');

var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

var port = process.env.PORT || 3000;

// for views
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use('/assets', express.static(__dirname + '/public'));
// bring in the public directory -- remember to require('path')
app.use(express.static(path.join(__dirname, 'public')));

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