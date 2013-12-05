var Server = require('pomelo-rpc').server;

// remote service path info list
var paths = [
  {namespace: 'user', path: __dirname + '/remote/test'}
];

var port = 8086;

var server = Server.create({paths: paths, port: port});
server.start();

console.log('RPC server is running ...');

