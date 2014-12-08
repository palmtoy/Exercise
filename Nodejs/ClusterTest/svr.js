// NODE_DEBUG=cluster node svr.js

var cluster = require('cluster');

cluster.setupMaster({
  exec : "worker.js",
  args : ["--use", "https"],
  // silent : true
});

if (cluster.isMaster) {
  console.log('I am master.');
  cluster.fork();
  cluster.fork();
} else if (cluster.isWorker) {
  console.log('I am worker #' + cluster.worker.id + '.');
}


// Go through all workers
function eachWorker(callback) {
  for (var id in cluster.workers) {
    callback(cluster.workers[id]);
  }
}

eachWorker(function(worker) {
  worker.send('big announcement to all workers');
  console.log('Worker #' + worker.id + ' is running.');
});

