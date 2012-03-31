var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recipeSchema = new Schema({
	'recipe': Object,
	'prev': Number,
	'owner': Number,
	'name': String
});

module.exports = mongoose.model('Recipe', recipeSchema);
