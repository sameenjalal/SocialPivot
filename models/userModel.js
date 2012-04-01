var mongoose = require('mongoose');
var schemas = require('./schemas.js');

module.exports = mongoose.model('User', schemas.user);
