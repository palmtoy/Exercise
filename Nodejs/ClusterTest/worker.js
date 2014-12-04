var http = require('http');

http.createServer(function(req, res) {
  res.writeHead(200);
  res.end("hello world\n");
  console.log(process.pid + ' is servering ...');
}).listen(8000);

