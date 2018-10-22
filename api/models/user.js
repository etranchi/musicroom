var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const User = new Schema({
  login: String,
  email: String,
  creationDate: Date
});

module.exports = mongoose.model('user', User);;