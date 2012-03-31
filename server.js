/* enviroment */
var port = process.env.PORT || 4242;

/* requires */
var express = require("express");
var routes = require("./routes/routes.js");


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


/* CRUD */
app.get('/', routes.helloworld);


/* start 'er up */
app.listen(port);
console.log("server has started on port "+port);
