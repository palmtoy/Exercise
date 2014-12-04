/*
node cli.js 
or
node cli.js localhost 8000
*/

var http = require('http');

// console.log('argv = ', JSON.stringify(process.argv));

var options = {
  host: process.argv[2] || 'localhost',
  port: process.argv[3] || 8000,
  path: '/',
  method: 'GET'
};

for(var i = 0; i < 3; i++) {
  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      console.log(chunk);
    });
  });

  req.end();
}

