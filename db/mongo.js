const mongoose = require('mongoose');
const mongoDB = 'mongodb://172.17.0.2:27017/music_room';

mongoose.connect(mongoDB, { useNewUrlParser: true });

mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

