/*
GET  ~ curl -v http://127.0.0.1:3000
GET  ~ curl -v http://127.0.0.1:3000/hi
POST ~ curl -v -d 'user=zgli' http://localhost:3000/wow
*/

var http = require('http');
var connect = require('connect');
var connectables = require('connectables');

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
      console.log('req.body = ', req.body);
      res.end('Oh yes, WOW!');
    });
  })
);


var server = http.createServer(app);
server.listen(port);

console.log('Server running at http://127.0.0.1:' + port);

