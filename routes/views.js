/* requires */
var User = require('../models/userModel.js'),
	Idea = require('../models/ideaModel.js'),
	Comment = require('../models/commentModel.js');

function loginStatus(req) {
	var session;
	if(req.session) {
		session = {
			user: req.session.user,
			logged_in: true
		};
	} else {
		session = {
			logged_in: false
		};
	}
	return session;
}

function internalError(res, err){
	console.log('Error : '+err);
	res.writeHead(500);
	res.end('Internal Server Error!');
}

function sortChrono(event1, event2){
	if(event1.timestamp < event2.timestamp){
		return 1;
	}else if(event1.timestamp > event2.timestamp){
		return -1;
	}else{
		return 0;
	}
}

/* exported functions */
module.exports = {

	notfound : 
		function(req, res){
			res.writeHead(404);
			res.end('request not found');
		},

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
								comments : comments,
								session: loginStatus(req)
							});
						}
					});
				}
			});
		},


	/* renders the search view for a given query */
	searchView :
		function(req, res){
			var search_terms = req.query.search_terms;
			var search_terms_list = search_terms.split( "\\s+" );

			var docs_list_ideas = [];
			Idea.find({ 'name': { $in: search_terms_list } }, function( err, ideas ){
				if( err ){
					internalError( res, err );
				} else if( ideas !== null ) {
					docs_list_ideas = ideas;
				}
			});

			var docs_list_comments = [];
			Comment.find({ 'text': { $in: search_terms_list } }, function( err, comments ){
				if( err ){
					internalError( res, err );
				} else if( comment !== null ) {
					docs_list_comments = comments;
				}
			});

			var docs_list_userinfo = [];
			User.find({ 'info': { $in: search_terms_list } }, function( err, userinfo ){
				if( err ){
					internalError( res, err );
				} else if( userinfo !== null ) {
					docs_list_userinfo = userinfo;
				}
			});

			var docs_list_user = [];
			User.find({ 'username': { $in: search_terms_list } }, function( err, user ){
				if( err ){
					internalError( res, err );
				} else if( user !== null ) {
					docs_list_user = user;
				}
			});

			var master_docs_list = docs_list_ideas.concat( docs_list_comments, docs_list_userinfo, docs_list_user );
			var sorted_master_list = master_docs_list.sort( sortChrono );

			/* render user profile */
			res.render('searchView.ejs', {
				search_terms : sorted_master_list.splice(0, 10),
				session: loginStatus(req)
			});
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
								activity: activity,
								session: loginStatus(req)
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
