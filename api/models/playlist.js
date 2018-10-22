var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Playlist = new Schema({
	id: Schema.Types.ObjectId,
	status:{
		type: String,
		enum: ['Active', 'Suspended', 'Created']
	}
});

module.exports = mongoose.model('playlist', Playlist);;
