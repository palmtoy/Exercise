// openssl pkcs12 -export -out server.pfx -inkey agent2-key.pem -in agent2-cert.pem

// curl -k https://localhost:8000/

var https = require('https');
var fs = require('fs');

var options = {
  pfx: fs.readFileSync('test/fixtures/keys/server.pfx')
};

var port = 8000;
https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("Hello World\n");
}).listen(8000);

console.log('Https svr is running on port:', port, '...');

