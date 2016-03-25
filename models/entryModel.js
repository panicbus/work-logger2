var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var entrySchema = new Schema({
  username: String,
  date: { type: Date, required: true, default: Date.now },
  hours: String,
  payout: String,
  tips: String,
  income: String
});

// defining and accessing the Mongoose model
var Entries = mongoose.model('Entries', entrySchema);

module.exports = Entries;