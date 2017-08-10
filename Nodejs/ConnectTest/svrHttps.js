#!/usr/bin/env node

/*

connect, connectables, qs are 3 open source projects:

connect      : https://github.com/senchalabs/connect
connectables : https://github.com/DamonOehlman/connectables
qs           : https://github.com/visionmedia/node-querystring

================================================

Use this cmd to run it: "node svr.js"

================================================

In another cmd window, run these test cases:

GET  ~~  curl -kv https://127.0.0.1:3000
GET  ~~  curl -kv https://127.0.0.1:3000/hi
POST ~~  curl -kv -d 'user=will' https://localhost:3000/wow
POST ~~  curl -kv -d 'user[name][first]=will&user[email]=zgli@kabaminc.com' https://localhost:3000/qs

Chrome Postman:
POST ~~  https://localhost:3000/wow   form-data: user will
POST ~~  https://localhost:3000/qs    form-data: user[name][first] will; user[email] lzg@pwrd.com

*/

var https = require('https');
var connect = require('connect');
var connectables = require('connectables');
var qs = require('qs');
var fs = require('fs');

var port = 3000;

var app = connect.createServer(
  connect.logger(),

  // used to parse the POST request string to json obj
  connect.bodyParser(),

  connectables.router(function(router) {
    // GET
    router.get('/', function(req, res, next) {
      res.end('Hello world!');
    });

    router.get('/hi', function(req, res, next) {
      res.end('Hi baby ~');
    });

    // POST
    router.post('/wow', function(req, res, next) {
      console.log('wow ~ req.body = ', req.body);
      res.end('Oh yes, WOW!');
    });

    router.post('/qs', function(req, res, next) {
      console.log('qs ~ req.body = ', req.body);
      // qs.stringify convert json obj to POST request string
      var ret = 'QueryString: ' + JSON.stringify(req.body) + '\t\t' +
        'OriginString: ' + qs.stringify(req.body);
      res.end(ret);
    });
  })
);

var options = {
	key: fs.readFileSync('ssl/agent2-key.pem'),
	cert: fs.readFileSync('ssl/agent2-cert.pem')
};

var server = https.createServer(options, app);
server.listen(port);

console.log('Https server running at https://127.0.0.1:' + port);

