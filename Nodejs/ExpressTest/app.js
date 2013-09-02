var express = require('express');
var app = express();
var myPrint = require('./utils').myPrint;

app.use(function(req, res, next){
	// myPrint('Object.keys(req) = ', Object.keys(req));
	// myPrint('Object.keys(res) = ', Object.keys(res));
	// myPrint('req.method, req.url = ', req.method, req.url);
	myPrint('req.url = ', req.url);
	myPrint('req.originalUrl = ', req.originalUrl);
	myPrint('req._parsedUrl = ', req._parsedUrl);

	var now = Date.now();
	myPrint('1 ~ now = ', now);
	next();
});

app.get('/', function(req, res){
	var now = Date();
	myPrint(now + ' ~ Http request ...');
	res.send('hi, baby ~ : ' + now);
});

app.listen(8080);
console.log('Express http server is running ...');

