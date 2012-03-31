/* requires */
var User = require('../models/userModel.js'),
	Idea = require('../models/ideaModel.js'),
	Comment = require('../models/commentModel.js');


function internalError(res, err){
	console.log('Error : '+err);
	res.writeHead(500);
	res.end('Internal Server Error!');
}

function sortChrono(event1, event2){
	if(event1.date < event2.date){
		return 1;
	else if(event1.date > event2.date){
		return -1;
	else{
		return 0;
	}
}

/* exported functions */
module.exports = {

	404 : 
		function(req, res){
			res.writeHead(404);
			res.end('request not found');
		}

	/* renders the idea view for a :ideaID that corrosponds to db ID */
	ideaView :
		function(req, res){
			
			/* find the idea */
			Idea.findById(req.params.ideaID, function(err, idea){
				if(err){
					internalServerError(res, err);
				}else if(idea === null){
					res.writeHead(404);
					res.end('Could not find Idea');
				}else{
					
					/* find the comments */
					Comment.find({
						idea : req.params.ideaID
					}, function(err, comments){
						if(err){
							internalServerError(res, err);
						}else{
							comments.sort(sortChrono);
							
							/* render the view */
							res.render(idea, {
								idea : idea, 
								comments : comments
							});
						}
					});
				}
			});
		},


	/* renders the search view for a given query */
	searchView :
		function(req, res){
			
						 
		},


	/* renders the feed view for most recent activity */
	/* TODO this is bad, currently pullng everything and then sorting */
	feedView :
		function(req, res){
			
			/* find all the ideas */
			Ideas.find({}, function(err, ideas){
				if(err){
					internalServerError(res, err);
				}else{
					
					/* find all the comments */
					Comment.find({}, function(err, comments){
						if(err){
							internalServerError(res, ideas);
						}else{
							
							/* sort and render */
							var activity = [];
							activity.push(ideas);
							activity.push(comments);
							activity.sort(sortChrono);
							activity.splice(0, 20);
							res.render('feedView.ejs', {
								activity: activity
							});
						}
					});
				}
			});
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
									
									/* sort the top 10 recent activity */
									var activity = [];
									activity.push(ideas);
									activity.push(comments);
									activity.sort(sortChrono);

									/* render user profile */
									res.render('profileView.ejs', {
										user : foundUsers.sort(sortChrono),
										ideas : foundIdeas.sort(sortChrono),
										comments : foundComments.sort(sortChrono),
										recent : activity.splice(0, 10)
									});
								}
							});
						}
					});
				}
			});
		}

};
