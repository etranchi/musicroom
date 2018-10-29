const mongoose = require('mongoose');
const mongoDB = 'mongodb://mongo/music_room';

mongoose.connect(mongoDB, {
	useNewUrlParser: true,
	useCreateIndex: true
});

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

