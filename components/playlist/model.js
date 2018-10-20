const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlist = new Schema({
	id: Schema.Types.ObjectId,
	status:{
		type: String,
		enum: ['Active', 'Suspended', 'Created']
	}
});
