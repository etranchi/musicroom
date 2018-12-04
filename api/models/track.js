 var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
const Track = new Schema({
	id: {
		type: Number,
	},
	userId: {
		type: Schema.Types.ObjectId
	},
	readable: {
		type: Boolean,
	},
	title: {
		type: String,
	},
	title_short: {
		type: String,
	},
	title_version: {
		type: String,
	},
	isrc: {
		type: String,
	},
	link: {
		type: String,
	},
	share: {
		type: String,
	},
	duration: {
		type: Number,
	},
	track_position: {
		type: Number,
	},
	disk_number: {
		type: Number,
	},
	rank: {
		type: Number,
	},
	release_date: {
		type: Date
	},
	explicit_lyrics: {
		type: String
	},
	preview: {
		type: String
	},
	bpm: {
		type: Number,
	},
	gain: {
		type: Number,
	},
	contributors: {
		type: Object,
	},
	artist: {
		type: Object,
	},
	album: {
		type: Object,
	},
});

module.exports = mongoose.model('track', Track);