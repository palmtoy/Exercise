var tty = require('tty.js');

// username & password: ['foo': 'bar'], ['hello': 'world']
var configObj = require('./config.json');

var app = tty.createServer(configObj);

app.listen();

