var http = require('http');

var port = 8080;

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var now = new Date();
  res.end(now + ' ~ Hello World\n');
}).listen(port);

console.log('Server running at %d ...', port);


