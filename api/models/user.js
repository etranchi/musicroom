var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const User = new Schema({
	id : Schema.Types.ObjectId,
	login:{
		type: String,
		default: 'Created'
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
		type: String
	},
	creationDate: {type: Date, default: Date()}
});

module.exports = mongoose.model('user', User);