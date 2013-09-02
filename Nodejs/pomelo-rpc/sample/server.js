// var Server = require('..').server;
var Server = require('../index').server;

console.log('__dirname = ', __dirname);
// remote service path info list
var paths = [
  {namespace: 'user', path: __dirname + '/remote/test'}
];

var port = 3333;

var server = Server.create({paths: paths, port: port});
server.start();

console.log('rpc server started ...');