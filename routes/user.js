var User = require('../models/userModel.js'), 
	bcrypt = require('bcrypt')
module.exports = {
	
	create :
		function(req, res){
			User.findOne({username: req.body.username}, function(err, doc) {
				if(err) {
					var response = {
						status: 'Error',
						data: err
					}
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
							userId: newUser._id
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
						}
					}
				}
				res.send(response);
			});
		},
	
	
	read :
		function(req, res){

		},
	
	
	update :
		function(req, res){
			
		},


	destroy :
		function(req, res){
			User.findById(req.body.id, function(err, doc) {
				if(err) {
					var response = {
						status: 'Error',
						data: err
					}
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
