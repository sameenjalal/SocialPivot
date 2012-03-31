/* enviroment */
var port = process.env.PORT || 4242;

/* requires */
var express = require("express");
var routes = {
	user : require('./routes/user.js'),
	idea : require('./routes/idea.js'),
	comment : require('./routes/comment.js'),
	views : require('./routes/views.js'),
	authentication: require('./routes/authentication.js')
};

/* create server */
var app = express.createServer();

/* configs */
app.configure(function(){
	app.user(express.bodyParser());
	app.use(express.cookieDecoder());
	app.use(express.session());
	app.use(express.static(__dirname+"/public"));
	app.set('views', __dirname+'/views');
	app.set('view engine', 'ejs');
	app.set('view options', {
		layout : false
	});
});


/* routes */

/* CRUD operations on models */
app.post("/create_:model?", function(req, res) {
	if(!req.params.mode){
		routes[req.params.model].create(req, res);
	}else{
		routes.views.404(req, res);
	}
});
app.get("/read_:model?", function(req, res) {
	if(!req.params.mode){
		routes[req.params.model].read(req, res);
	}else{
		routes.views.404(req, res);
	}
});
app.post("/update_:model?", function(req, res) {
	if(!req.params.mode){
		routes[req.params.model].update(req, res);
	}else{
		routes.views.404(req, res);
	}	
});
app.get("/destroy_:model?", function(req, res) {
	if(!req.params.mode){
		routes[req.params.model].destroy(req, res);
	}else{
		routes.views.404(req, res);
	}	
});

/* views */
app.get("/profile/:username", routes.views.profile);
app.get("/idea/:ideaID", routes.views.idea);
app.get("/search?", routes.views.search);
app.get("/feed", routes.views.feed);
app.post("/login", routes.authentication.login);
app.post("/logout", routes.authentication.logout);

/* hello world testing */
app.get('/', function(req, res){
	res.send('hello world');
});


/* start 'er up */
app.listen(port);
console.log("server has started on port "+port);
