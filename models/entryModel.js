var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var entrySchema = new Schema({
  // username: String,
  date: { type: Date, required: 'Please enter year', default: Date.now },
  hours: { type: Number },
  payout: { type: Number },
  tips: { type: Number },
  income: { type: Number }
});

// defining and accessing the Mongoose model

module.exports = mongoose.model('Entries', entrySchema);