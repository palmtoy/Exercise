// run me: DEBUG=http,worker node app.js
//		 or: DEBUG=worker node app.js

var debug = require('debug')('http')
	, http = require('http')
	, name = 'My App';

// fake app 
debug('booting %s', name);

http.createServer(function(req, res){
	debug(req.method + ' ' + req.url);
	res.end('hello\n');
}).listen(3000, function(){
	debug('listening');
});

// fake worker of some kind 
require('./worker');


/*
output:
	http booting My App +0ms
	http listening +6ms
	worker doing some work +1s
	worker doing some work +1s
	worker doing some work +1s
	http GET / +179ms
	http GET /favicon.ico +317ms
	http GET /favicon.ico +41ms
	worker doing some work +464ms
	worker doing some work +1s
	worker doing some work +1s
*/
