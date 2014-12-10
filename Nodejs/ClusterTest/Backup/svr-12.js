// NODE_DEBUG=cluster node svr.js

var cluster = require('cluster');
var http = require('http');


if (cluster.isMaster) {

  // Fork workers.
  for (var i = 0; i < 3; i++) {
    cluster.fork();
  }

  for (var id in cluster.workers) {
    var worker = cluster.workers[id];
    worker.on('message', function(msg) {
      // we only want to intercept messages that have a chat property
      if (msg.chat) {
        console.log('\n', 'I am master, pid:' + process.pid, '~ Worker to master: ', msg.chat);
        console.log('Worker to master: ', msg.chat);
        worker.send({ chat: 'Ok worker, Master got the message! Over and out!' });
      }
    });
  }

} else if (cluster.isWorker) {

  process.on('message', function(msg) {
    // we only want to intercept messages that have a chat property
    if (msg.chat) {
      console.log('\n', 'I am worker, pid:' + process.pid, ', #' + cluster.worker.id + ' Master to worker: ', msg.chat);
    }
  });

  // Worker processes have a http server.
  http.Server(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
    // Send message to master process
    process.send({ chat: '#' + cluster.worker.id + ' Hey master, I got a new request!' });
  }).listen(8000);

}
