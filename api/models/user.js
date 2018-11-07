var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const User = new Schema({
	facebookId: {
		type: String
	},
	facebookToken: {
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
	},
	password:{
		type: String,
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
	},
	creationDate: {
		type: Date,
		default: Date()
	}
}, { versionKey: false });

module.exports = mongoose.model('user', User);