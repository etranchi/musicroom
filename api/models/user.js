var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const User = new Schema({
	id : Schema.Types.ObjectId,
	pseudo:{
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
});

module.exports = mongoose.model('user', User);