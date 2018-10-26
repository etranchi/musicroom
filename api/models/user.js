var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const User = new Schema({
	id : {
		type: Schema.Types.ObjectId,
		primaryKey: true,
		unique: true
	},
	facebookId : String,
	salt: {
			type: String,
			allowNull: false,
			unique: true
		},
	login:{
		type: String,
		allowNull: false
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