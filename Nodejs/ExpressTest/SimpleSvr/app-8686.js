// jx package app.js app.exe -native

var express = require('express');
var app = express();
var myPrint = console.log;
var port = 8686;


app.use(function(req, res, next){
	myPrint('req.url = ', req.url);

	var now = Date.now();
	myPrint('1 ~ now = ', now);
	next();
});

app.get('/greet/:name', function(req, res){
	var now = Date();
	myPrint(now + ' ~ Http request-/greet/:name ...');

	var userName = req.params.name;
	res.send(now + ' @' + port + ' ~ Hi, ' + userName);
});

app.get('/playwith/:name', function(req, res){
	var now = Date();
	myPrint(now + ' ~ Http request-/playwith/:name ...');

	var userName = req.params.name;
	res.send(now + ' @' + port + ' ~ Awesome, ' + userName);
});

app.get('/bye/:name', function(req, res){
	var now = Date();
	myPrint(now + ' ~ Http request-/bye/:name ...');

	var userName = req.params.name;
	res.send(now + ' @' + port + ' ~ Bye, ' + userName);
});

app.listen(port);
myPrint('Express http server is running on', port, '...');

