var Entries = require('../models/entryModel');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var User = require('../models/user');

module.exports = function(app) {
	// populate the main table page with values from the DB model request




app.get('/table', function(req, res){
  function renderTable(res, data){
    console.log('boom!!!')
    res.render('table', {user:data['user'], entries:data['entries']});
  }
  console.log("------------currentUser---" + req.user)
  User.findById(req.user._id, function(err, user){
    if(err){
      console.log(err)
    } else {
      console.log('these are the users: ' + user);
      Entries.find(function(err, entries){
        if (err) {
          console.log('entries.find err: ' + err)
        } else {
          console.log('found entries: ' + entries)
          console.log('found user: ' + user)
          renderTable(res, {user: user, entries: entries});
        } // end else 2

      }) // end Entries.find
    } // end else 1
  }) // end .exec

})



	// POST from main Index form
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



	// Bryans Post from main form
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
					res.redirect('/table');
			} // end first else statement
		}); // end User.findById
	});

}