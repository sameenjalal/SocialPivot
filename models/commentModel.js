var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;
var User = require('./userModel.js');
var User = require('./ideaModel.js');

var commentSchema = new Schema({
	'user': User,
	'idea': Idea,
	'rating': Number,
	'text': String,
	'timestamp': Date
});

module.exports = mongoose.model('Comment', commentSchema);
