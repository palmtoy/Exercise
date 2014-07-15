/*
curl -v http://127.0.0.1:3000
*/

var http = require('http');
var connect = require('connect');

var app = connect()
.use(function(req, res){
  res.end('Hello world!\n');
})

http.createServer(app).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

