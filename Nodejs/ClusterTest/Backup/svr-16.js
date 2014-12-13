// NODE_DEBUG=cluster node svr.js
// node cli.js
// http://localhost:8000/

var cluster = require('cluster');
var http = require('http');

if (cluster.isMaster) {

  // Keep track of http requests
  var numReqs = 0;
  setInterval(function() {
    console.log("numReqs =", numReqs);
  }, 2000);

  // Count requestes
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd == 'notifyRequest') {
      numReqs += 1;
      console.log("\t\tword id = #" + msg.wid);
    }
  }

  // Start workers and listen for messages containing notifyRequest
  var numCPUs = require('os').cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  Object.keys(cluster.workers).forEach(function(id) {
    var worker = cluster.workers[id];
    worker.on('message', messageHandler);

    worker.on('online', function() {
      console.log('#', worker.id, 'is online ...');
    });

  });

} else {

  // Worker processes have a http server.
  http.Server(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");

    // notify master about the request
    process.send({ cmd: 'notifyRequest', wid: cluster.worker.id });
  }).listen(8000);
}

