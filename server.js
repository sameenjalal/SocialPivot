/* enviroment */
var port = process.env.PORT || 4242;

/* requires */
var express = require("express");


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
app.get('/', function(req, res){
	res.sent('hello world');
});
app.post('createUser', routes.user.create);
app.get('removeUser', routes.user.remove);





/* start 'er up */
app.listen(port);
console.log("server has started on port "+port);
