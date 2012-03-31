var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ideaSchema = new Schema({
	'idea': Object,
	'prev': ObjectId,
	'owner': ObjectId,
	'name': String,
	'timestamp': Date
});

module.exports = mongoose.model('Idea', ideaSchema);
