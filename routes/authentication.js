var User = require('../models/userModel.js'),
	mongoose = require('mongoose'),
	http = require('http'),
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
						bcrypt.compare(req.body.password, doc.password, function(err, match) {
							if(err || match === false) {
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
		},

	register:
		function(req, res) {
			var post_data = "";
			for(key in req.body) {
				if(req.body.hasOwnProperty(key)) {
					post_data += key + "=" + req.body[key] + "&";
				}
			}
			post_data = post_data.slice(0, post_data.length-1);
			console.log(post_data);
			var post_options = {
		      host: 'localhost',
		      port: '4242',
		      path: '/create_user',
		      method: 'POST',
		      headers: {
		          'Content-Type': 'application/x-www-form-urlencoded',
		          'Content-Length': post_data.length
		      }
		  	};

		  	var post_request = http.request(post_options, function(userRes) {
		  		userRes.setEncoding('utf8');
		  		var respData = "";
		  		userRes.on('data', function(chunk) {
		  			respData += chunk;
		  		});
		  		userRes.on('end', function() {
		  			var userData = JSON.parse(respData);
		  			console.log(userData);
		  			if(userData.status === "Success") {
		  				req.session.user = {
							_id: userData.data._id,
							name: userData.data.name
						};
		  				res.redirect("/feed");
		  			} else if(userData.status === "Failure" || userData.status === "Error") {
		  				res.redirect("/signup");
		  			}
		  		});
		  	});

		  	post_request.write(post_data);
		  	post_request.end();
		}
};
