var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	'username': String,
	'password': String,
	'pic': String,
	'info': String,
	'timestamp': Date
});

var ideaSchema = new Schema({
	'idea': {},
	'owner': [userSchema],
	'name': String,
	'timestamp': Date
});

ideaSchema.add({prev : [ideaSchema]});

var commentSchema = new Schema({
	'user' : [userSchema],
	'idea' : [ideaSchema],
	'rating' : Number,
	'text' : String,
	'timestamp' : Date
});

module.exports({
	user : userSchema,
	idea : ideaSchema,
	comment : commentSchema
});