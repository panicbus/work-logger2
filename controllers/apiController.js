var Entries = require('../models/entryModel');
var User = require('../models/user');
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
	// app.get('/api/entries/:user_id', function(req, res){
	// 	// mongoose model
	// 	Entries.find({ _id: req.params.user_id }, function(err, entries){
	// 		if (err) throw err;
	// 		//comes back as json
	// 		res.send(entries);
	// 	});
	// });

	// // GET THE ENTRIES PER THE USER ID
	// the user id param is coming from htmlController.js line 19
	app.get('/api/user', function(req, res){
		// mongoose provides the findById method
		// will be a single response so entry (singular)
		// looks for the User by id then populates the response with the items
		// in the User's entries array
		User.findById(req.user._id).populate('entries').exec(function(err, user){
			if (err) throw err;
			// console.log('user.entries ****==: ' + user.entries);
			res.send(user.entries);
		});
	});


	// UPDATE ENTRY
	app.post('/api/entry/:entry_id', function(req, res){
		// error cases
		if (!req.params.entry_id)
	  return res.status(400).send('an entry_id must be provided');
		// if (!req.body.date)
	  // return res.status(400).send('date must be provided');
		if (!req.body.hours)
	  return res.status(400).send('hours field can\'t be blank');
		if (!req.body.miles)
	  return res.status(400).send('miles field must be provided');
		if (!req.body.payout)
	  return res.status(400).send('payout must be provided');
		if (!req.body.tips)
	  return res.status(400).send('tips must be provided');
		// if (!req.body.income)
	 //  return res.status(400).send('income must be provided');

	  var updateData = {
		  date: req.body.date,
		  miles: req.body.miles,
		  hours: req.body.hours,
		  payout: req.body.payout,
		  tips: req.body.tips
		  // income: req.body.income
	  };
	  Entries.findByIdAndUpdate(req.params.entry_id, updateData, function(err, entry){
	    if (err)
	      return res.status(500).send(err)

	    return res.status(200).send('Successs bitch!');
	  })
	});

	// CREATE NEW ENTRY
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


	// DELETE ENTRY with clicked entry param id
		// TODO: have the delete method delete from User DB too entries array
	app.delete('/api/entry/:entry_id', function(req, res){
				// .remove would also work
		Entries.findByIdAndRemove({
      _id : req.params.entry_id
    }, function(err, entry) {
    	// be careful with the res.send calls. without conditionalizing them
    	// they'll throw an error: "Can't set headers after they are sent"
      if (err) {
        res.send(err);
      }
      else {
	      // get and return remaining entries
	      Entries.find(function(err, entries) {
	        if (err) {
	          res.send(err)
	        }
	        else {
	          res.json(entries);
		      }
	      });
	    } // end first else
    }); // end err, entry function
  }); // end .delete

	// method to attemp to remove the entry from user NOT FUKING WORKING
	app.delete('/api/user', function(req, res){
		console.log('----the req.user.entries from USER in delete: ' + req.user.entries);
		console.log('----the req.user._id from USER in delete: ' + req.user._id);
		User.findById(req.user._id).populate('entries').exec(function(err, user){
			if (err) {
				throw err
			} else {
				console.log('user.entries delete ran: ' + user.entries.id);
				User.findByIdAndRemove(user.entries.id);
			}
		});
	})


}

