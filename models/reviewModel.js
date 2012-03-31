var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new Schema({
	'user': Number,
	'recipe': Number,
	'rating': Number,
	'text': String
});

module.exports = mongoose.model('Review', reviewSchema);
