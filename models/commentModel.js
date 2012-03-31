var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	'user': ObjectId,
	'idea': {},
	'rating': Number,
	'text': String,
	'timestamp': Date
});

module.exports = mongoose.model('Comment', commentSchema);
