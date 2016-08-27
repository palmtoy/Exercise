#!/usr/bin/env node

var spawn = require('child_process').spawn;
var lsChildP = spawn(
		'ls'
	, ['-lh', '/usr']
	, {detached: true}
);

lsChildP.stdout.on('data', function(data) {
  console.log('stdout: ' + data.toString());
});

lsChildP.stderr.on('data', function(data) {
  console.log('stderr: ' + data);
});

lsChildP.on('close', function(code) {
  console.log('child process exited with code ' + code);
});


lsChildP.unref();

