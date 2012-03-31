var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var User = require( 'userModel.js' );

var Schema = mongoose.Schema;

var ideaSchema = new Schema({
	'idea': {},
	'prev': User,
	'owner': User,
	'name': String,
	'timestamp': Date
});

module.exports = mongoose.model('Idea', ideaSchema);
