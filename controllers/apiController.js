var Entries = require('../models/entryModel');
var bodyParser = require('body-parser');

// export from this js file endpoints
module.exports = function(app){

	// middleware to parse json from the http request body
	app.use(bodyParser.json());
	// to handle url encoded data - certain characters are encoded to %20 etc
	app.use(bodyParser.urlencoded({ extended: true }));

	// GET ALL ENTRIES
	app.get('/api/entries', function(req, res){
		// mongoose model
		Entries.find(function(err, entries){
			if (err) throw err;
			//comes back as json
			res.send(entries);
		});
	});

	// GET ALL THE ENTRIES FOR A PARTICULAR USER (OR WHATEVER)
	// the :username means parameter than can change on the url
	// you get that value with req.params
	app.get('/api/entries/:username', function(req, res){

		// mongoose model
		Entries.find({ username: req.params.username }, function(err, entries){
			if (err) throw err;
			//comes back as json
			res.send(entries);
		});
	});


	// GET ALL THE ENTRIES FOR AN ID
	app.get('/api/entry/:id', function(req, res){
		// mongoose provides the findById method
		// will be a single response so entry (singular)
		Entries.findById({ _id: req.params.id }, function(err, entry){
			if (err) throw err;

			res.send(entry);
		});
	});

	// POST A NEW ENTRY
	app.post('/api/entry', function(req, res){
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
				res.send('Success!');
			});
		}
	});

	// DELETE AN ENTRY
	app.delete('/api/entry', function(req, res){
		Entries.findByIdAndRemove(req.body.id, function(err){
			if (err) throw err;
			res.send('Success!!')
		})
	});

}