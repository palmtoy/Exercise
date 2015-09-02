var express = require('express');
var app = express();
var myPrint = require('./utils').myPrint;

app.use(function(req, res, next){
	myPrint('req.url = ', req.url);
	myPrint('req.originalUrl = ', req.originalUrl);
	myPrint('req._parsedUrl = ', JSON.stringify(req._parsedUrl));

	var now = Date.now();
	myPrint('1 ~ now = ', now);
	next();
});

app.get('/pullCodeAndUpdateSvr', function(req, res){
	var now = Date();
	myPrint(now + ' ~ Http request ...');
	res.send('Yes! Pull code and update svr right now! ~ : ' + now);
});

app.listen(8086);
console.log('Express http server is running ...');

