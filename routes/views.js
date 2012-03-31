User = require('../models/userModel.js');
Idea = require('../models/ideaModel.js');
Comment = require('../models/commentModel.js');

function internalError(res, err){
	console.log('Error : '+err);
	res.writeHead(500);
	res.end('Internal Server Error!');
}

module.exports = {

	/* renders the idea view for a :ideaID that corrosponds to db ID */
	ideaView :
		function(req, res){
			
			Idea.findById(req.params.ideaID, function(err, idea){
				res.render(idea, {idea : idea});
			});
		},


	/* renders the search view for a given query */
	searchView :
		function(req, res){
			
			 
		},





	/* renders the profile for a :username passed as a param */
	profileView : 
		function(req, res){
		
			/* get user data */
			User.findOne({
				name : req.params.username
			}, function(err, foundUser){
				if(err){
					internalError(res, err);
				}else if(foundUser === null){
					res.writeHead(404);
					res.end('Unknown User');
				}else{

					/* get ideas made by user */
					Idea.find({
						owner: foundUser._id
					}, function(err, foundIdeas){
						if(err){
							internalError(res, err);
						}else{

							/* get comments written by user */
							Comment.find({
								owner: foundUser._id
							}, function(err, foundComments){
								if(err){
									internalError(res, err);
								}else{
									
									/* render user profile */
									res.render('profileView.ejs', {
										user : foundUser,
										ideas : foundIdeas,
										comments : foundComments
									});
								}
							});
						}
					});
				}
			});
		},
							


		/* get user data */
		User.findOne({
			name : req.params.username
		}, function(err, foundUser){
			if(err){
				internalError(res, err);
			}else if(foundUser === null){
				res.writeHead(404);
				res.end('Unknown User');
			}else{

				/* get recipies made by user */
				Recipie.find({
					owner: foundUser._id
				}, function(err, foundRecipes){
					if(err){
						internalError(res, err);
					}else{

						/* get reviews written by user */
						Review.find({
							owner: foundUser._id
						}, function(err, foundReviews){
							if(err){
								internalError(res, err);
							}else{
								res.render('profileView.ejs', {
									user : foundUser,
									recipies : foundRecipes,
									reviews : foundReviews
								});
							}
						});
					}
				});
			}
		});
	}
};
