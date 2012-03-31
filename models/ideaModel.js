var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ideaSchema = new Schema({
	'idea': Object,
	'prev': ObjectId,
	'owner': ObjectId,
	'name': String
});

module.exports = mongoose.model('Idea', ideaSchema);
