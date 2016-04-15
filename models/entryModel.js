var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var entrySchema = new Schema({
  // username: String,
  date: { type: Date, required: 'Please enter year', default: Date.now },
  hours: { type: Number },
  payout: { type: Number },
  tips: { type: Number },
  income: { type: Number },
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
	// user_id: {
 //    id: {
 //      type: mongoose.Schema.Types.ObjectId,
 //      ref: User
 //    },
 //    username: String
 //  }
});

// defining and accessing the Mongoose model
var Entries = mongoose.model('Entries', entrySchema);

module.exports = Entries;