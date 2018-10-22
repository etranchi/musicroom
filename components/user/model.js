const Schema = require('mongoose').Schema;
 
const user = new Schema({
  id: Schema.ObjectId,
  login: String,
  email: String,
  creationDate: Date
});