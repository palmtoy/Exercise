/*
GET  ~ curl -v http://127.0.0.1:3000
POST ~ curl -v -d 'user=zgli' http://localhost:3000
POST ~ curl -v -d '{"user":{"name":"zgli"}}' -H "Content-Type: application/json" http://localhost:3000
*/

var http = require('http');
var connect = require('connect');

var app = connect()
.use(connect.bodyParser())
.use(function(req, res){
  console.log('req.body = ', req.body);
  res.end('Hello world!');
});

http.createServer(app).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

