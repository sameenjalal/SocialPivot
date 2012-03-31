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
			res.send(true);
		},
	
	
	read :
		function(req, res){
		
		},
	
	
	update :
		function(req, res){
		
		},


	destroy :
		function(req, res){
			Review.findById(req.body.id, function( err, docs ) {
				if( err ) {
					var response = {
						status: "Error",
						data: err
					};
				} else {
					if( docs == null ) {
						var response = {
							status: "Failure",
							data: "Fuck you from review destroy"
						};
					} else {
						var response = {
							status: "Success",
							data: true
						};
						docs.remove();
					}
				}
				res.send( true );
			}
		}
}
