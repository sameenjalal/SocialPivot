/* requires */
var User = require('../models/userModel.js'),
	Idea = require('../models/ideaModel.js'),
	Comment = require('../models/commentModel.js'),
	http = require('http'),
	mongoose = require('mongoose'),
	ObjectId = mongoose.Types.ObjectId;

function loginStatus(req) {
	var session;
	if(req.session.user) {
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

	/* render landing view */
	landingView :
		function(req, res){
			
			res.render('landing.ejs', {
				session : loginStatus(req)
			});
		},

	signup:
		function(req, res) {
			res.render('signup.ejs', {
				session: loginStatus(req)
			});
		},

	createIdea:
		function(req, res) {
			if(req.body.prev) {

			} else {
				res.render('createIdea.ejs', {
					session: loginStatus(req)
				});
			}
		},

	saveIdea:
		function(req, res) {
			var post_data = "";
			req.body.owner = req.session.id;
			for(key in req.body) {
				if(req.body.hasOwnProperty(key)) {
					post_data += key + "=" + req.body[key] + "&";
				}
			}
			post_data = post_data.slice(0, post_data.length-1);
			var post_options = {
		      host: 'localhost',
		      port: '4242',
		      path: '/create_idea',
		      method: 'POST',
		      headers: {
		          'Content-Type': 'application/x-www-form-urlencoded',
		          'Content-Length': post_data.length
		      }
		  	};
		  	var post_request = http.request(post_options, function(ideaRes) {
		  		ideaRes.setEncoding('utf8');
		  		var respData = "";
		  		ideaRes.on('data', function(chunk) {
		  			respData += chunk;
		  		});
		  		ideaRes.on('end', function() {
		  			var ideaData = JSON.parse(respData);
		  			console.log()
		  			if(ideaData.status === "Success") {
		  				res.redirect("/ideaView/"+ideaData.data);
		  			} else {
		  				res.redirect("/createIdea");
		  			}
		  		});
		  	});

		  	post_request.write(post_data);
		  	post_request.end();
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
						"idea._id": new ObjectId(req.params.ideaID)
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

	/* renders the search view for a given query
	*  params:
	*   search_terms: String
	*/
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
			Idea.find({}, function(err, ideas){
				if(err){
					internalServerError(res, err);
				} else{
					console.log('\n\n'+typeof ideas);
					console.log('\n\nideas is '+ideas);
					/* find all the comments */
					Comment.find({}, function(err, comments){
						if(err){
							internalServerError(res, ideas);
						} else {
							
							console.log('\n\ncomments is '+comments);
							/* sort and render */
							var activity = ideas.concat(comments);
							
							console.log('\n\nactivity is : '+activity);
							//activity.sort(sortChrono);
							activity.slice(0, 20);
							console.log('\n\nactivity is : '+activity);
							var session = loginStatus(req);
							res.render('feed.ejs', {
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
			User.findOne({ _id : new ObjectId(req.params.userId)}, function(err, foundUser){
				if(err){
					internalError(res, err);
				}else if(foundUser === null){
					res.writeHead(404);
					res.end('Unknown User');
				}else{

					/* get ideas made by user */
					Idea.find({owner: foundUser._id}, function(err, foundIdeas){
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
									activity.push(foundIdeas);
									activity.push(foundComments);
									activity.sort(sortChrono);

									/* render user profile */
									res.render('profileView.ejs', {
										user : foundUser,
										ideas : foundIdeas.sort(sortChrono),
										comments : foundComments.sort(sortChrono),
										recent : activity.splice(0, 10),
										session: loginStatus(req)
									});
								}
							});
						}
					});
				}
			});
		}

};
