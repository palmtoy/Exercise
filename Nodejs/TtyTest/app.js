/*

openssl genrsa 2048 > ./ssh/server.key
openssl req -x509 -new -key ./ssh/server.key > ./ssh/server.cert

*/

var tty = require('tty.js');

// username & password: ['foo': 'bar'], ['hello': 'world']
var configObj = require('./config.json');

var app = tty.createServer(configObj);

app.listen();

