// NODE_DEBUG=cluster node server.js

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

// console.log('\n' + process.pid + ', process.env.NODE_UNIQUE_ID = ' + process.env.NODE_UNIQUE_ID + '\n');

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
    console.log(process.pid + ' is servering ...');
  }).listen(8000);
}

