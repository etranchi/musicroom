const Schema = require('mongoose').Schema;
 
const user = new Schema({
  login: String,
  email: String,
  creationDate: Date
});

module.exports = user;