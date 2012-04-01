var Comment = require("../models/commentModel.js"),
	mongoose = require('mongoose'),
	ObjectId = mongoose.Types.ObjectId,
	User = require( "../models/userModel.js" ),
	Idea = require( "../models/ideaModel.js" );

module.exports = {
	
	/* creates and stores a Comment thru a post
	* post params:
	*  user_id : userID
	*  idea_id : ideaID
	*  rating : Number
	*  text : String
	*/
	create :
		function(req, res){
			var my_user;
			var response;
			User.findOne( { "_id": new ObjectId( req.body.user_id ) }, function( err, user ) {
				if( err ){
					response = {
						status: "Error",
						data: err
					};
					res.send( response );
				} else if( user === null ) {
					response = {
						status: "Failure",
						data: user
					};
					res.send( response );
				} else {
					Idea.findOne( { "_id": new ObjectId( req.body.idea_id ) }, function( err, idea ) {
						if( err ){
							response = {
								status: "Error",
								data: err
							};
							res.send( response );
						} else if( idea !== null ) {
							response = {
								status: "Failure",
								data: idea
							};
							res.send( response );
						} else {
							var newComment = new Comment({
								'user': user,
								'idea': idea,
								'rating': req.body.rating,
								'text': req.body.text,
								'timestamp': Date.now()
							});
							newComment.save();
							response = {
								status: "Success",
								data: req.body.idea_id
							};
							res.send( response );
						}
					});
				}
			});
		},
	
	
	read :
		function( req, res ) {
			Comment.find( req.body.params, req.body.fields, function( err, docs ) {
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
