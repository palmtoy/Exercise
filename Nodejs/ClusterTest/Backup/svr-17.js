// NODE_DEBUG=cluster node svr.js
// telnet localhost 8000

var cluster = require('cluster');

function getTime() {
  var d = new Date();
  return d + ':' + d.getMilliseconds() + '(ms) ~ ';
}

if (cluster.isMaster) {

  var worker = cluster.fork();
  var timeout;

  worker.on('listening', function(addr) {
    var t = getTime();
    console.log('\n', t + ' I am master, pid:' + process.pid + ', address: ' + JSON.stringify(addr));
    worker.send('The worker is listening ...');
  });

  worker.on('message', function(msg) {
    var t = getTime();
    console.log('\n', t + ' I am master, pid:' + process.pid + ', I received msg ' + msg);
    worker.send('shutdown');
    worker.disconnect();
    timeout = setTimeout(function() {
      t = getTime();
      console.log('\n', t + ' I am master, pid:' + process.pid + ', kill is running ...');
      worker.kill();
    }, 3000);
  });

  worker.on('disconnect', function() {
    var t = getTime();
    console.log('\n', t + ' I am master, pid:' + process.pid + ', worker has disconnected.');
    clearTimeout(timeout);
  });

} else if (cluster.isWorker) {

  var net = require('net');
  var server = net.createServer(function(socket) {
    // connections never end
    socket.on('data', function(msg) {
      var t = getTime();
      console.log('\n', t + ' I am worker, pid:' + process.pid + ', #' + cluster.worker.id + ', Received telnet data: ' + msg);
      process.send('-> The worker got msg: ' + msg);
    });
  });

  server.listen(8000);

  process.on('message', function(msg) {
    var t = getTime();
    console.log('\n', t + ' I am worker, pid:' + process.pid + ', #' + cluster.worker.id + ', Received msg -> ' + msg);
    if(msg === 'shutdown') {
      // initiate graceful close of any connections to server
      console.log('\n', t + ' I am worker, pid:' + process.pid + ', #' + cluster.worker.id + ', Bye.');
      process.exit();
    }
  });

}

