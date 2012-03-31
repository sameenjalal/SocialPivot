var User = require('../models/userModel.js'), 
	bcrypt = require('bcrypt'),
	ObjectId = mongoose.Type.ObjectId;
module.exports = {
	
	create :
		function(req, res){
			User.findOne({username: req.body.username}, function(err, doc) {
				if(err) {
					var response = {
						status: 'Error',
						data: err
					};
				} else {
					if(doc === null) {
						var salt = bcrypt.genSaltSync(10);
						var newUser = new User({
							'username': req.body.username,
							'password': bcrypt.hashSync(req.body.password),
							'pic': req.body.pic,
							'info': req.body.info;
						});
						var response = {
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
						var response = {
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
			User.find(req.body.userParams, req.body.userFields, function(err, docs) {
				if(err) {
					var response = {
						status: 'Error',
						data: err
					};
				} else {
					if(docs !== null) {
						var response = {
							status: 'Success',
							data: docs
						};
					} else {
						var response = {
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
			User.update({_id: new ObjectId(req.body.id), req.body.update, req.body.option function(err, numAffected) {
				if(err) {
					var response = {
						status: 'Error',
						data: err
					};
				} else {
					var response = {
						status: 'Success',
						data: numAffected
					};
				}
			});
		},


	destroy :
		function(req, res){
			User.findById(req.body.id, function(err, doc) {
				if(err) {
					var response = {
						status: 'Error',
						data: err
					};
				} else {
					if(doc !== null) {
						doc.remove();
						var response = {
							status: 'Success',
						};
					} else {
						var response {
							status: 'Failure',
							data: 'No user with this ObjectId exists'
						};
					}
				}
			});
			res.send(response);
		}
}
