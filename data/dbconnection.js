var config = require('../config');
var mongoose = require('mongoose');

var db = {};

db.connect = () => {
	mongoose.connect(config.database);
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'Connection Error --'));

	db.once('open', () => {
		console.log("Connected successfully to MongoDB database.");
	});
}

module.exports = db;