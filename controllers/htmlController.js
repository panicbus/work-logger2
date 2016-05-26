var Entries = require('../models/entryModel');
var User = require('../models/user');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

	// populate the main table page with values from the DB model request

	// GET DATA FOR TABLE PAGE
	// this is the get request that does all the heavy lifting to send data to angular
	// On the /table uri, it looks up the User id & if it finds it, looks for the Entries array
	// then runs the renderTable function that routes to then renders the table page
	// using user data and entries data, essentially /table/user/20930293839
	// but only using the /table url (which angular needed)
	// -- this would also work as a router.get method --
	app.get('/table', function(req, res){
	  function renderTable(res, data){
	    res.render('table', {user:data['user'], entries:data['entries']});
	  }
	  console.log("------------currentUser---" + req.user)
	  User.findById(req.user._id, function(err, user){
	    if(err){
	      console.log(err)
	    } else {
	      // console.log('these are the users: ' + user);
	      Entries.find(function(err, entries){
	        if (err) {
	          console.log('entries.find err: ' + err)
	        } else {
	          // console.log('found entries: ' + entries)
	          // console.log('found user: ' + user)
	          renderTable(res, {user: user, entries: entries});
	        } // end else 2

	      }) // end Entries.find
	    } // end else 1
	  }) // end .exec
	});

	// POST FROM MAIN FORM
	// takes the user id from the url on the index page & uses it as a param (:id)
	app.post('/table/:id', urlencodedParser, function(req, res){
		User.findById(req.params.id, function(err, user){
			if (err) {
				console.log(err);
			} else {
				// the constructor
				var newEntry ={
				  date: req.body.date,
				  hours: req.body.hours,
				  payout: req.body.payout,
				  tips: req.body.tips,
				  miles: req.body.miles,
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
					req.flash('success', 'Entry successfully created!');
					// navigate to /table url - then node will run the app.get('/table') from above
					res.redirect('/table');
			} // end first else statement
		}); // end User.findById
	});


		// an alternative POST method (from Index form)
	// app.post('/table', urlencodedParser, function(req, res){
	// 	var newEntry = Entries({
	// 	  date: req.body.date,
	// 	  hours: req.body.hours,
	// 	  payout: req.body.payout,
	// 	  tips: req.body.tips,
	// 	  income: req.body.income
	// 	  // user_id: req.params.id
	// 	});
	// 	// and save to Mongo
	// 	newEntry.save(function(err){
	// 		if (err) throw err;
	// 		res.render('table');
	// 	});
	// });

}