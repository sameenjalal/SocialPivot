var Idea = require("../models/ideaModel.js");

module.exports = {
	
	create :
		function(req, res){
			var newIdea = new Idea({
				'idea': req.body.idea,
				'prev': new ObjectId(req.body.prev),
				'owner': new ObjectId(req.body.owner),
				'name': req.body.name
			});
			newIdea.save();
			var response = {
				status: "Success",
				data: "Just created a idea"
			};
			res.send( response );
		},
	
	
	read :
		function(req, res){
			Idea.find(req.body.params, req.body.fields, function(err, docs) {
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
			Idea.update({_id: new ObjectId(req.body.id)}, req.body.update, req.body.option, function(err, numAffected) {
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
			Idea.findById( req.body.id, function( err, docs ) {
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
							data: false
						};
					} else {
						response = {
							status: "Success",
							data: true
						};
						docs.remove();
					}
				}
			});
			res.send( response );
		}
};
