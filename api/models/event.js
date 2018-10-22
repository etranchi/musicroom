var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Event = new Schema({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  creation_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('event', Event);;