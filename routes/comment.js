var Comment = require("../models/commentModel.js");

module.exports = {
	
	create :
		function(req, res){
			var newComment = new Comment({
				'user': new ObjectId(req.body.user),
				'idea': new ObjectId(req.body.idea),
				'rating': req.body.rating,
				'text': req.body.text,
				'timestamp': Date.now()
			});
			newComment.save();
			var response = {
				status: "Success",
				data: "Just created a comment"
			};
			res.send( response );
		},
	
	
	read :
		function(req, res){
			Comment.find(req.body.params, req.body.fields, function(err, docs) {
				var response;
				if( err ) {
					response = {
						status: "Error",
						data: err
					};
				} else {
					if( docs === null ) {
						response = {
							status: "Failure",
							data: "Fuck you, from read"
						};
					} else {
						response = {
							status: "Success",
							data: docs
						};
					}
				}
			});
			res.send( response );
		},
	
	
	update :
		function(req, res){
			Comment.update({_id: new ObjectId(req.body.id)}, req.body.update, req.body.option, function(err, numAffected) {
				var response;
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
			res.send( response );
		},


	destroy :
		function(req, res){
			Comment.findById(req.body.id, function( err, docs ) {
				var response;
				if( err ) {
					response = {
						status: "Error",
						data: err
					};
				} else {
					if( docs === null ) {
						response = {
							status: "Failure",
							data: "Fuck you from comment destroy"
						};
					} else {
						response = {
							status: "Success",
							data: true
						};
						docs.remove();
					}
				}
				res.send( response );
			});
		}
};
