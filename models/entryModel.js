var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var entrySchema = new Schema({
  username: String,
  date: { type: Date, required: true, default: Date.now },
  hours: { type: Number },
  payout: { type: Number },
  tips: { type: Number },
  income: { type: Number }
});

// defining and accessing the Mongoose model
var Entries = mongoose.model('Entries', entrySchema);

module.exports = Entries;