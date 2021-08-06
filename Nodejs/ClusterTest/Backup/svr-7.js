// NODE_DEBUG=cluster node svr.js

const cluster = require('cluster');

if (cluster.isMaster) {

  console.log(`I am master ${JSON.stringify({process: process.pid})}.`);

  cluster.fork();
  cluster.fork();

	cluster.on('exit', (worker, code, signal) => {
		console.log(`worker #${worker.id} pid:${worker.process.pid} died (${signal || code}). restarting ...`);
		cluster.fork();
	});

} else if (cluster.isWorker) {

  console.log('I am worker #' + cluster.worker.id + ` ${JSON.stringify({process: process.pid})}` + ', pid:' + cluster.worker.process.pid + '.');

}

