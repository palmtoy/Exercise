// NODE_DEBUG=cluster node svr.js

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

// console.log('\n' + process.pid + ', process.env.NODE_UNIQUE_ID = ' + process.env.NODE_UNIQUE_ID + '\n');

var timeouts = [];
function errorMsg() {
  console.error("Something must be wrong with the connection ...");
}


if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('fork', function(worker) {
    timeouts[worker.id] = setTimeout(errorMsg, 2000);
    console.error(worker.id + " is forked.");
  });
  cluster.on('listening', function(worker, address) {
    clearTimeout(timeouts[worker.id]);
    console.log(worker.id + " is listening and now connected to " + address.address + ":" + address.port);
  });
  cluster.on('online', function(worker) {
    console.log(worker.id + ": Yay, the worker responded(online) after it was forked.");
  });

  cluster.on('disconnect', function(worker) {
    console.log('The worker #' + worker.id + ' has disconnected');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
    cluster.fork();
  });

  cluster.on('exit', function(worker, code, signal) {
    clearTimeout(timeouts[worker.id]);
    errorMsg();
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





