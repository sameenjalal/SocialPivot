var Review = require("../models/reviewModel.js");

module.exports = {
	
	create :
		function(req, res){
			var newReview = new Review({
				'user': new ObjectId(req.body.user),
				'recipe': new ObjectId(req.body.recipe),
				'rating': req.body.rating,
				'text': req.body.text
			});
			newReview.save();
			var response = {
				status: "Success",
				data: "Just created a review"
			};
			res.send( response );
		},
	
	
	read :
		function(req, res){
			Review.find(req.body.params, req.body.fields, function(err, docs) {
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
			Review.update({_id: new ObjectId(req.body.id)}, req.body.update, req.body.option, function(err, numAffected) {
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
			Review.findById(req.body.id, function( err, docs ) {
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
							data: "Fuck you from review destroy"
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
