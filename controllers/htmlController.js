var Entries = require('../models/entryModel');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
	// populate the main table page with values from the DB model request
	app.get('/table', function(req, res) {
		Entries.findById(req.body.id, {
				// the properties we're updating and the new values
				// username: req.body.username,
			  date: req.body.date,
			  hours: req.body.hours,
			  payout: req.body.payout,
			  tips: req.body.tips,
			  income: req.body.income
			}, function(err, entry){
				if (err) throw err;

				res.render('table');
				console.log(entry);
			})
	});

	app.get('/table/:id', function(req, res) {
		console.log('request: ');
		res.render('table', {
			date: req.params.date,
			hours: req.params.hours,
			payout: req.params.payout,
			tips: req.params.tips,
			income: req.params.income
		});
	});

	// POST from main Index form
	app.post('/table', urlencodedParser, function(req, res){
		var newEntry = Entries({
		  date: req.body.date,
		  hours: req.body.hours,
		  payout: req.body.payout,
		  tips: req.body.tips,
		  income: req.body.income
		  // user_id: req.params.id
		});
		// and save to Mongo
		newEntry.save(function(err){
			if (err) throw err;
			res.render('table');
		});
	});


	// POST with user id
	app.post('/table/:id', urlencodedParser, function(req, res){
		var newEntry = Entries({
		  date: req.body.date,
		  hours: req.body.hours,
		  payout: req.body.payout,
		  tips: req.body.tips,
		  income: req.body.income
		  // user_id: req.query.id
		});
		console.log(req.params.id);
		// and save to Mongo
		newEntry.save(function(err){
			if (err) throw err;
			res.render('table');
		});
	});

// app.post('/api/entry', function(req, res){
	// 	var newEntry = Entries({
	// 		// username: req.body.username,
	// 	  date: req.body.date,
	// 	  hours: req.body.hours,
	// 	  payout: req.body.payout,
	// 	  tips: req.body.tips,
	// 	  income: req.body.income,
	// 	  id: req.body.id,
	// 	  user_id: req.body.id
	// 	});
	// 	console.log('AKBAR');
	// 	console.log(req.body);
	// 	// and save to Mongo
	// 	newEntry.save(function(err){
	// 		if (err) throw err;
	// 		res.send('Success!');
	// 	});
	// });





}