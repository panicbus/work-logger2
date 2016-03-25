var Entries = require('../models/entryModel');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

	// app.get('/', function(req, res) {
	// 	res.render('index');
	// });

	app.get('/table', function(req, res) {
		Entries.findById(req.body.id, {
				// the properties we're updating and the new values
				username: req.body.username,
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
		console.log(req);
		res.render('table', {
			id: req.params.id,
			date: req.params.date,
			hours: req.params.hours,
			payout: req.params.payout,
			tips: req.params.tips,
			income: req.params.income
		});
	});

	// POST
	app.post('/table', urlencodedParser, function(req, res){
		//if it already has an id it must be in there already
		if (req.body.id) {
			// so UPDATE IT
			Entries.findByIdAndUpdate(req.body.id, {
				// the properties we're updating and the new values
				username: req.body.username,
			  date: req.body.date,
			  hours: req.body.hours,
			  payout: req.body.payout,
			  tips: req.body.tips,
			  income: req.body.income
			}, function(err, entry){
				if (err) throw err;
				res.send('Success!');
			})
		}
		else {
			// if there is no id, CREATE IT
			var newEntry = Entries({
				username: req.body.username,
			  date: req.body.date,
			  hours: req.body.hours,
			  payout: req.body.payout,
			  tips: req.body.tips,
			  income: req.body.income
			});
			// and save to Mongo
			newEntry.save(function(err){
				if (err) throw err;
				res.render('table');
			});
		}
	});

	// DELETE
	app.delete('/table', function(req, res){
		Entries.findByIdAndRemove(req.body.id, function(err){
			if (err) throw err;
			res.send('Success!!')
		})
	});

}