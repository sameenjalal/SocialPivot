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
	'idea_body': String,
	'owner': [userSchema],
	'name': String,
	'timestamp': Date,
	'tags': []
});

ideaSchema.add({
	prev : [ideaSchema]
});

var commentSchema = new Schema({
	'user' : [userSchema],
	'idea' : [ideaSchema],
	'rating' : Number,
	'text' : String,
	'timestamp' : Date
});

module.exports = {
	user : userSchema,
	idea : ideaSchema,
	comment : commentSchema
};
