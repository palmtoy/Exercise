#!/usr/bin/env node

var Client = require('ssh2').Client;
 
var conn = new Client();

conn.on('ready', function() {
  console.log('Client :: ready');
  conn.shell(function(err, stream) {
    if (err) throw err;
    stream.on('close', function() {
      console.log('Stream :: close');
      conn.end();
    }).on('data', function(data) {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });
    stream.end('ls -la\nexit\n');
  });
}).connect({
	host: '10.80.110.81',
  port: 22,
	username: 'zgli',
	privateKey: require('fs').readFileSync('/Users/will/.ssh/id_rsa')
});

