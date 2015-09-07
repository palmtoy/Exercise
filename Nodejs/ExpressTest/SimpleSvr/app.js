// jx package app.js app.exe -native

var express = require('express');
var app = express();
var myPrint = console.log;
var port = 8080;


app.use(function(req, res, next){
	myPrint('req.url = ', req.url);

	var now = Date.now();
	myPrint('1 ~ now = ', now);
	next();
});

app.get('/', function(req, res){
	var now = Date();
	myPrint(now + ' ~ Http request ...');
	res.send('hi, baby ~ : ' + now);
});

app.listen(port);
myPrint('Express http server is running on', port, '...');

