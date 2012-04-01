/* enviroment */
var port = process.env.PORT || 4242;
var secret = require('./secret.js');
var db_path = "mongodb://batman:"+secret.password+"@staff.mongohq.com:10005/socialpivot";

/* requires */
var express = require("express");
var mongoose = require('mongoose');
var routes = {
	user : require('./routes/user.js'),
	idea : require('./routes/idea.js'),
	comment : require('./routes/comment.js'),
	views : require('./routes/views.js'),
	authentication: require('./routes/authentication.js')
};


/* create server */
var app = express.createServer();

/* init database */
db = mongoose.connect(db_path);


/* configs */
app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({secret: "catwoman"}));
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
		routes.views.notfound(req, res);
	}
});
app.get("/read_:model?", function(req, res) {
	if(!req.params.mode){
		routes[req.params.model].read(req, res);
	}else{
		routes.views.notfound(req, res);
	}
});
app.post("/update_:model?", function(req, res) {
	if(!req.params.mode){
		routes[req.params.model].update(req, res);
	}else{
		routes.views.notfound(req, res);
	}	
});
app.get("/destroy_:model?", function(req, res) {
	if(!req.params.mode){
		routes[req.params.model].destroy(req, res);
	}else{
		routes.views.notfound(req, res);
	}	
});

/* Login */
app.get("/login", routes.authentication.login);

/* views */
app.get("/profile/:userId", routes.views.profileView);
app.get("/idea/:ideaID", routes.views.ideaView);
app.get("/search?", routes.views.searchView);
app.get("/feed", routes.views.feedView);

/* Laning page */
app.get('/', routes.views.landingView);


/* start 'er up */
mongoose.connection.on('open', function(){
	console.log('mongoose has opened a connection to '+db_path);
});
app.listen(port);
console.log("server has started on port "+port);
