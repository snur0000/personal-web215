const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  entry: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('journals', JournalSchema);
