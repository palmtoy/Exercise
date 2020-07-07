// jx package app.js app.exe -native

var express = require('express');
var app = express();
var myPrint = console.log;
var port = 8086;


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

	setTimeout(function() {
		res.send(now + ' ~ Hi, ' + userName);
	}, 2000);
});

app.get('/playwith/:name', function(req, res){
	var now = Date();
	myPrint(now + ' ~ Http request-/playwith/:name ...');

	var userName = req.params.name;
	res.send(now + ' ~ Awesome, ' + userName);
});

app.get('/bye/:name', function(req, res){
	var now = Date();
	myPrint(now + ' ~ Http request-/bye/:name ...');

	var userName = req.params.name;
	res.send(now + ' ~ Bye, ' + userName);
});

// curl http://localhost:8086/redos-me?filePath=../xyt.txt
app.get('/redos-me', (req, res) => {
  const filePath = req.query.filePath;

	let resStr = '';
  // REDOS
  if (filePath.match(/(\/.+)+$/)) {
		resStr = 'valid path';
  }
  else {
		resStr = 'invalid path';
  }

  res.send(resStr);
});

app.listen(port);
myPrint('Express http server is running on', port, '...');

