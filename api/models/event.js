var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Event = new Schema({
	email: {
		type: String,
		required: true
	},
	creation_date: {
		type: Date,
		default: Date.now
	},
	playlist_id: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('event', Event);;