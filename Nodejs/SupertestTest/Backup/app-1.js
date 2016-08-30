var express = require('express');
var app = express();

app.use(function(req, res, next){
	// console.log('Object.keys(req) = ', Object.keys(req));
	// console.log('Object.keys(res) = ', Object.keys(res));
	// console.log('req.method, req.url = ', req.method, req.url);
	console.log('req.url = ', req.url);
	console.log('req.originalUrl = ', req.originalUrl);
	console.log('req._parsedUrl = ', req._parsedUrl);

	var now = Date.now();
	console.log('1 ~ now = ', now);
	next();
});

app.get('/', function(req, res){
	var now = Date();
	console.log(now + ' ~ Http request ...');
	res.send('hi, baby ~ : ' + now);
});

app.get('/wow', function(req, res){
	res.send('heya');
});


var port = 8081;
app.listen(port);
console.log('Express http server is running on', port, '...');


var request = require('supertest');
request = request('http://localhost:' + port);

request.get('/wow').expect(200, function(err){
	console.log(err);
});

request.get('/wow').expect('heya', function(err){
	console.log(err);
});

