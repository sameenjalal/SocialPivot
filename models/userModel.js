var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	'username': String,
	'password': String,
	'pic': String,
	'info': String
});

module.exports = mongoose.model('User', userSchema);