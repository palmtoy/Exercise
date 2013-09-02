var spawn = require('child_process').spawn,
    grep  = spawn('grep', ['ssh']);

console.log('Spawned child pid: ' + grep.pid);

var n = 0;
setInterval(function() {
	console.log(++n + ' hello');
}, 1500);

process.on('SIGINT', function() {
	console.log('good bye');
	process.exit(0);
});

// grep.stdin.end();
