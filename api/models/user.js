var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const User = new Schema({
	facebookId: {
		type: String
	},
	login:{
		type: String,
		allowNull: false
	},
	password:{
		type: String,
		allowNull: false,
		visibility: 1
	},
	status:{
		type: String,
		enum: ['Active', 'Suspended', 'Created'],
		default: 'Created'
	},
	picture:{
		type: String
	},
	email:{
		type: String,
		unique: true,
		allowNull: false
	},
	creationDate: {
		type: Date,
		default: Date()
	}
});

module.exports = mongoose.model('user', User);