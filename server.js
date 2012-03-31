/* enviroment */
var port = process.env.PORT || 4242;

/* requires */
var express = require("express");
var routes = {
	user : require('./routes/user.js'),
	recipe : require('./routes/recipe.js'),
	review : require('./routes/review.js')
};

/* create server */
var app = express.createServer();

/* configs */
app.configure(function(){
	app.use(express.static(__dirname+"/public"));
	app.set('views', __dirname+'/views');
	app.set('view engine', 'ejs');
	app.set('view options', {
		layout : false
	});
});


/* routes */
/* hello world test */
app.get('/', function(req, res){
	res.send('hello world');
});
/* crud operations */
app.post('createUser', routes.user.create);
app.get('removeUser', routes.user.remove);
app.post('createRecipe', routes.recipe.create);
app.get('removeRevipe', routes.recipe.remove);
app.post('createReview', routes.review.create);
app.get('removeReview', routes.review.remove);


/* start 'er up */
app.listen(port);
console.log("server has started on port "+port);
