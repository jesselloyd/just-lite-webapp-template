var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {type: String, required: true, unique: true },
	username: { type: String, require: true, unique: true },
	passwordHash: {type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);