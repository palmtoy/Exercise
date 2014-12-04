var http = require('http');

var port = 8000;

http.createServer(function(req, res) {
  res.writeHead(200);
  res.end("hello world\n");
  console.log(process.pid + ' is servering ...');
}).listen(port);


console.log('Http svr is running on port: ' + port);

