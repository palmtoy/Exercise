/*
GET  ~ curl -v http://127.0.0.1:3000
GET  ~ curl -v http://127.0.0.1:3000/hi
POST ~ curl -v -d 'user=zgli' http://localhost:3000/wow
POST ~ curl -v -d 'user[name][first]=will&user[email]=will@learnboost.com' http://localhost:3000/qs
*/

var http = require('http');
var connect = require('connect');
var connectables = require('connectables');
var qs = require('qs');

var port = 3000;

var app = connect.createServer(
  connect.logger(),

  connect.bodyParser(),

  connectables.router(function(router) {
    router.get('/', function(req, res, next) {
      res.end('Hello world!');
    });

    router.get('/hi', function(req, res, next) {
      res.end('Hi baby ~');
    });

    router.post('/wow', function(req, res, next) {
      console.log('wow ~ req.body = ', req.body);
      res.end('Oh yes, WOW!');
    });

    router.post('/qs', function(req, res, next) {
      console.log('qs ~ req.body = ', req.body);
      var ret = 'QueryString: ' + JSON.stringify(req.body) + '\t\t' +
        'OriginString: ' + qs.stringify(req.body);
      res.end(ret);
    });
  })
);


var server = http.createServer(app);
server.listen(port);

console.log('Server running at http://127.0.0.1:' + port);

