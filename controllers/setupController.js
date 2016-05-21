// JUST FOR ADDING DUMMY DATA

// go up 2 levels
var Entries = require('../models/entryModel');

module.exports = function(app){

	app.get('/api/setupEntries', function(req, res){

		// seed database
		// check out json-generator.com to get as much dummy json data as you want
		var starterEntry = [
			{
				username: 'nico',
				date: 'March 21',
	      hours: '8',
	      payout: '80',
	      tips: '20',
	      income: '100'
			},
			{
				username: 'nico',
				date: 'March 29',
	      hours: '2',
	      payout: '20',
	      tips: '5',
	      income: '25'
			}
		];
		// we already required Table model (entryModel)
		// as a mongoose created model we can call lost of methods, .create being one
		Entries.create(starterEntry, function(err, results){
			// output results back to browser after they've been created
			res.send(results);
		});
	});
}