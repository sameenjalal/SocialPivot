var User = require('../models/userModel.js'),
	bcrypt = require('bcrypt'),
	mongoose = require('mongoose'),
	ObjectId = mongoose.Types.ObjectId;

module.exports = {
	/* PARAMS
		@POST PARAMS
		username: the username of the user
		password: password of the user
		pic: avatar for hte user
		info: a little user bio
	*/
	
	create :
		function(req, res){
			var response;
			User.findOne({username: req.body.username}, function(err, doc) {
				if(err) {
					response = {
						status: 'Error',
						data: err
					};
				} else {
					if(doc === null) {
						var salt = bcrypt.genSaltSync(10);
						var newUser = new User({
							'username': req.body.username,
							'password': bcrypt.hashSync(req.body.password, salt),
							'pic': req.body.pic,
							'info': req.body.info,
							'timestamp': Date.now()
						});
						response = {
							status: 'Success',
							data: newUser._id
						};
						newUser.save(function(err) {
							if(err) {
								response = {
									status: 'Error',
									data: err
								};
							}
						});
					} else {
						response = {
							status: 'Failure',
							data: 'A user with this username already exists'
						};
					}
				}
				res.send(response);
			});
		},
	
	
	read :
		function(req, res){
			var response;
			User.find(req.body.params, req.body.fields, function(err, docs) {
				if(err) {
					esponse = {
						status: 'Error',
						data: err
					};
				} else {
					if(docs !== null) {
						response = {
							status: 'Success',
							data: docs
						};
					} else {
						response = {
							status: 'Failure',
							data: 'No documents were found matching this request'
						};
					}
				}
			});
			res.send(response);
		},
	
	
	update :
		function(req, res){
			var response;
			User.update({_id: new ObjectId(req.body.id)}, req.body.update, req.body.options, function(err, numAffected) {
				if(err) {
					response = {
						status: 'Error',
						data: err
					};
				} else {
					response = {
						status: 'Success',
						data: numAffected
					};
				}
			});
		},


	destroy :
		function(req, res){
			var response;
			User.findById(req.body.id, function(err, doc) {
				if(err) {
					response = {
						status: 'Error',
						data: err
					};
				} else {
					if(doc !== null) {
						doc.remove();
						response = {
							status: 'Success'
						};
					} else {
						response = {
							status: 'Failure',
							data: 'No user with this ObjectId exists'
						};
					}
				}
			});
			res.send(response);
		}
};
