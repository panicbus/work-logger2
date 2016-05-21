var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var entrySchema = new Schema({
  date: { type: Date, default: Date.now },
  miles: { type: Number },
  hours: { type: Number },
  payout: { type: Number },
  tips: { type: Number }
},
{
	timestamps: true
});

// timestamps: true adds a createdAt and updatedAt property to the date in the model

// defining and accessing the Mongoose model
module.exports = mongoose.model('Entries', entrySchema);