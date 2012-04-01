var User = require('../models/userModel.js'),
	mongoose = require('mongoose'),
	bcrypt = require('bcrypt');

module.exports = {
	login:
		function(req, res) {
			var usrname = req.body.username;
			User.findOne({ "username": usrname}, function (err, doc) {
				if(err) {
					res.redirect('/');
				} else {
					if(doc !== null) {
						bcrypt.compare(req.body.password, doc.password, function(err, res) {
							if(err || res === false) {
								res.redirect('/');
							} else {
								req.session.user = {
									id: doc._id,
									name: doc.username
								};
								res.redirect('/feed');
							}
						});
					} else {
						res.redirect('/');
					}
				}
			});
		},

	logout:
		function(req, res) {
			if(req.session) {
				req.session.destroy(function() {});
			}
			res.redirect('/');
		}
};
