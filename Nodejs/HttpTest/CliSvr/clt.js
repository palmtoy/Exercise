/*
node clt.js localhost 8080
node clt.js www.baidu.com 80
*/

var http = require('http');

// console.log('argv = ', JSON.stringify(process.argv));

var options = {
  // host: 'localhost',
  host: process.argv[2],
  // hostname: '127.0.0.1',
  // port: 8080,
  port: process.argv[3],
  path: '/',
  method: 'GET'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function(chunk) {
    console.log(chunk);
  });
});

req.end();
