var config = require('../config');
var mongoose = require('mongoose');

var connect = () => {
	mongoose.connect(config.database);
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'Connection Error --'));

	db.once('open', () => {
		console.log("Connected successfully to MongoDB database.");
	});
}

module.exports = connect;