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
/* CRUD operations */
app.post("/create_:model?", function(req, res) {
	routes[req.params.model].create(req, res);
});
app.get("/read_:model?", function(req, res) {
	routes[req.params.model].read(req, res);
});
app.post("/update_:model?", function(req, res) {
	routes[req.params.model].update(req, res);
});
app.get("/destroy_:model?", function(req, res) {
	routes[req.params.model].destroy(req, res);
});
/* hello world testing */
app.get('/', function(req, res){
	res.send('hello world');
});


/* start 'er up */
app.listen(port);
console.log("server has started on port "+port);
