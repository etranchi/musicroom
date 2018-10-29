var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const User = new Schema({
	facebookId: {
		type: String
	},
	deezerToken: {
		type: String
	},
	deezerRefreshToken: {
		type: String
	},
	deezerId: {
		type: String
	},
	login:{
		type: String,
		allowNull: false
	},
	password:{
		type: String,
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