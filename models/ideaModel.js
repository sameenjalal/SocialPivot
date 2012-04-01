var mongoose = require('mongoose');
var schemas = require('./schemas.js');

mongoose.model('Idea', schemas.idea);