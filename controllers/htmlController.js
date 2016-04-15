var Entries = require('../models/entryModel');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var User = require('../models/user');

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
	// app.post('/table/:id', urlencodedParser, function(req, res){
	// 	var newEntry = Entries({
	// 	  date: req.body.date,
	// 	  hours: req.body.hours,
	// 	  payout: req.body.payout,
	// 	  tips: req.body.tips,
	// 	  income: req.body.income,
	// 	  user: {
	// 	  	_id: req.user._id
	// 	  }
	// 	  // user_id: req.query.id
	// 	});
	// 	console.log(req.params.id);
	// 	// and save to Mongo
	// 	newEntry.save(function(err){
	// 		if (err) throw err;
	// 		// res.render('table');
	// 		res.redirect('');
	// 	});
	// });

	app.post('/table/:id', urlencodedParser, function(req, res){
		User.findById(req.params.id, function(err, user){
			if (err) {
				console.log(err);
			} else {
				var newEntry ={
				  date: req.body.date,
				  hours: req.body.hours,
				  payout: req.body.payout,
				  tips: req.body.tips,
				  income: req.body.income,
				  user: {
				  	_id: req.user._id
				  }
				};
				Entries.create(newEntry, function(err, entry){
					if (err) {
						console.log(err)
					} else {
						user.entries.push(entry);
						console.log('newEntry was pushed to DB')
						user.save();
					}
				})
					res.redirect('/table/user/' + user._id);
			} // end first else statement
		}); // end User.findById
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