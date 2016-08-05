#!/usr/bin/env node

const spawn = require('child_process').spawn;
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', function(data) {
  console.log('stdout: ', data.toString());
});

ls.stderr.on('data', function(data) {
  console.log('stderr: ', data);
});

ls.on('close', function(code) {
  console.log('child process exited with code ', code);
});

