#!/usr/bin/env node

/*

Readme:

This is the simplest sparx http sever prototype.

================================================

connect, connectables, qs are 3 open source projects:

connect      : https://github.com/senchalabs/connect
connectables : https://github.com/DamonOehlman/connectables
qs           : https://github.com/visionmedia/node-querystring

================================================

Use this cmd to run it: "node httpSvr.js"

================================================

In another cmd window, run these test cases:

GET  ~~  curl -v http://127.0.0.1:3000
GET  ~~  curl -v http://127.0.0.1:3000/hi
POST ~~  curl -v -d 'user=will' http://localhost:3000/wow
POST ~~  curl -v -d 'user[name][first]=will&user[email]=zgli@kabaminc.com' http://localhost:3000/qs

Chrome Postman:
POST ~~  localhost:3000/wow   form-data: user will
POST ~~  localhost:3000/qs    form-data: user[name][first] will; user[email] zgli@kabaminc.com

*/

var http = require('http');
var connect = require('connect');
var connectables = require('connectables');
var qs = require('qs');

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


var server = http.createServer(app);
server.listen(port);

console.log('Http server running at http://127.0.0.1:' + port);

