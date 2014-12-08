// NODE_DEBUG=cluster node svr.js

var cluster = require('cluster');

if (cluster.isMaster) {
  console.log('I am master.');

  cluster.on('exit', function(worker, code, signal) {
    if (worker.suicide === true) {
      console.log('#' + worker.id + ': Oh, it was just suicide – no need to worry.');
    }
  });

  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log('I am worker #' + cluster.worker.id + ', pid:' + cluster.worker.process.pid + '.');
  // kill worker
  cluster.worker.kill();
}





