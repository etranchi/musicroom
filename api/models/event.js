const mongoose 	= require('mongoose');
const Schema 	= mongoose.Schema;
const User		= require('../models/user');
const Playlist 		= require('../models/playlist');

const Event = new Schema({
	creator: {type: User.schema, required:true},
	location: {
		address : {
			p: {type: String},
			v: {type: String},
			cp: {type: String},
			r: {type: String},
			n: {type: Number}
		},
		coord: {
			lat: {type: Number},
			long: {type: Number}
		}
	},
	visibility: {type:Number},
	public: {type: Boolean},
	creation_date: {type: Date, default: Date.now},
	playlist: {type: Playlist.schema, required: true},
	members : [User.schema],
	adminMembers: [User.schema]

});

module.exports = mongoose.model('event', Event);
