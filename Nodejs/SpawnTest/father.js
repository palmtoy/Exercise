var spawn = require('child_process').spawn;
var child = spawn('node', ['child.js'], {
  detached: true
  });

child.unref();

child.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

child.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

child.on('close', function (code) {
  console.log('child process exited with code ' + code);
});
