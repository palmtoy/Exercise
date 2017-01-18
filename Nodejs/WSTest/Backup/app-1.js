#!/usr/bin/env node

/*
	open chrome developer tools and input the following code:
		var wsObj = new WebSocket('wss://localhost:8068');
		wsObj.send('foo');
*/

var fs = require('fs')
	, https = require('https');

var privateKey  = fs.readFileSync('sslcerts/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcerts/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

var htmlPath = __dirname + '/pages';
app.use(express.static(htmlPath));

//... bunch of other express stuff here ...

//pass in your express app and credentials to create an https server
var httpsServer = https.createServer(credentials, app);
var port = 8068;
httpsServer.listen(port);
console.log('Https is running on port ' + port + ' ...');


// wss server
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
	server: httpsServer
});

wss.on('connection', function connection(wsObj) {
	console.log('wsObj.keys =', Object.keys(wsObj));

	wsObj.on('message', function incoming(message) {
		console.log('received: %s', message);
	});
});

