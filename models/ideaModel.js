var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Schema = mongoose.Schema;

var ideaSchema = new Schema({
	'idea': {},
	'prev': ObjectId,
	'owner': ObjectId,
	'name': String,
	'timestamp': Date
});

module.exports = mongoose.model('Idea', ideaSchema);
