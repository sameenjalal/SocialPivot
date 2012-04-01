var Idea = require("../models/ideaModel.js"),
	User = require("../models/userModel.js"),
	mongoose = require('mongoose'),
	ObjectId = mongoose.Types.ObjectId;

module.exports = {


	/* creates and stores Idea thru post
	 * post params:
	 *  name: String
	 *  owner: userID
	 *  prev: ideaID
	 *  idea: Stringified Object
	 */
	create :
		function(req, res) {
			var response;
			var newIdea;
			if(req.body.owner) {
				User.findOne({_id: new ObjectId(req.body.owner)}, function(err, doc) {
					if(err) {
						response = {
							status: "Error",
							data: err
						};
						res.send(response);
					} else if(doc !== null) {
						var idea_json_object = JSON.parse( req.body.idea );
						var idea_to_insert = {
							tags = idea_json_object[ 'tags' ],
							body = idea_json_object[ 'body' ]
						};
						if(req.body.prev) {
							Idea.findOne({_id: new ObjectId(req.body.prev)}, function(err, doc2) {
								if(err) {
									response = {
										status: "Error",
										data: err
									};
								} else if(doc !== null) {
									newIdea = new Idea({
										'idea': idea_to_insert,
										'name': req.body.name,
										'timestamp': Date.now()
									});
									newIdea.owner.push(doc);
									newIdea.prev.push(doc2);
									newIdea.markModified('idea');
									newIdea.save();
									response = {
										status: "Success",
										data: newIdea._id
									};
								} else {
									response = {
										status: "Failure",
										data: "The previous IDea could not be found"
									};
								}
								res.send(response);
							});
						} else {
							newIdea = new Idea({
								'idea': idea_to_insert,
								'name': req.body.name,
								'timestamp': Date.now()
							});
							newIdea.owner.push(doc);
							newIdea.markModified('idea');
							newIdea.save();
							response = {
								status: "Success",
								data: newIdea._id
							};
							res.send(response);
						}
					} else {
						response = {
							status: "Failure",
							data: "No owner by this Id could be found"
						};
						res.send(response);
					}
				});
			} else {
				response = {
					status: "Failure",
					data: "You didnt give me an owner Id!"
				};
				res.send(response);
			}
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
