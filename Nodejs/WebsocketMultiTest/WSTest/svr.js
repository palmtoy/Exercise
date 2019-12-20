#!/usr/bin/env node

var fs = require('fs')
	, https = require('https');

var privateKey  = fs.readFileSync('sslcerts/key.pem', 'utf8');
var certificate = fs.readFileSync('sslcerts/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

var htmlPath = __dirname + '/pages';
app.use(express.static(htmlPath));

//... bunch of other express stuff here ...

//pass in your express app and credentials to create an https server
var httpsServer = https.createServer(credentials, app);
var port = 8068;
httpsServer.listen(port);
console.log('Https is running on port ' + port + ' ...');


// wss server
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({
	server: httpsServer
});

var msgId = 0;
wss.on('connection', function connection(wsObj) {
  var self = this;
  var headLen = 4
    , itemLen = 4;

  wsObj.on('message', function(buf) {
    console.log('\nisBuffer(buf) = ', Buffer.isBuffer(buf));
    console.log('Received from cli: %d ~ %j', ++msgId, buf);

    var len = buf.readInt32BE(0);
    console.log('len = ', len);
    var offset = 0;
    var body = [];
    for(var i = 0; i < len; ++i) {
      body.push(buf.readFloatBE(headLen + offset * itemLen));
      ++offset;
    }
    console.log('body = %j', body);

    var sum = 0;
    for(var k in body) {
      sum += body[k];
    }
    console.log('sum = ', sum);

    try {
      // broadcast
      for(var i in self.clients) {
        self.clients[i].send(msgId + ' ~ ' + sum.toString(), {mask: true});
      }
    } catch(err) {
      throw err;
    }
  });
});

