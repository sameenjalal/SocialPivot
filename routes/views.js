User = require('../models/userModel.js');
Recipe = require('../models/recipeModel.js');
Review = require('../models/reviewModel.js');

function internalError(res, err){
	console.log('Error : '+err);
	res.writeHead(500);
	res.end('Internal Server Error!');
}

module.exports = {

	/* renders the profile for a :username passed as a param */
	profile : function(req, res){
		
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
