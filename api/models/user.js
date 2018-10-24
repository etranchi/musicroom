var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const User = new Schema({
  login: String,
  email: String,
  creationDate: {type: Date, default: Date()}
});

module.exports = mongoose.model('user', User);