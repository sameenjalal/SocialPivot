var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var commentSchema = new Schema({
	'user': ObjectId,
	'idea': ObjectId,
	'rating': Number,
	'text': String
});

module.exports = mongoose.model('Comment', commentSchema);
