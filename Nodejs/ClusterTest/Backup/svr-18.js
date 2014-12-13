// NODE_DEBUG=cluster node svr.js

// kill 49089
// kill -9 49089
// kill -usr2 49089

var cluster = require('cluster');

if (cluster.isMaster) {
  var worker = cluster.fork();

  worker.on('exit', function(code, signal) {
    if( signal ) {
      console.log("worker was killed by signal: "+signal);
    } else if( code !== 0 ) {
      console.log("worker exited with error code: "+code);
    } else {
      console.log("worker success!");
    }
  });
}
