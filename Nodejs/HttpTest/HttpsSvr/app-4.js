var https = require('https');
var fs = require('fs');

var options = {
  hostname: 'encrypted.google.com',
  port: 443,
  path: '/',
  method: 'GET',
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem'),
  agent: false
};

var req = https.request(options, function(res) {
  // console.log("statusCode: ", res.statusCode);
  // console.log("headers: ", res.headers);

  res.on('data', function(d) {
      process.stdout.write(d);
    });
});

req.end();

req.on('error', function(e) {
  console.error(e);
});






