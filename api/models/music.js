var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const Music = new Schema({
	id: {
		type: Number,
		required: true
	},
	title: {
		type: String,
	}
});

module.exports = mongoose.model('music', Music);;