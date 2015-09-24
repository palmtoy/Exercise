// openssl pkcs12 -export -out server.pfx -inkey agent2-key.pem -in agent2-cert.pem

// curl -k https://localhost:8089/

var https = require('https');
var fs = require('fs');

var options = {
  pfx: fs.readFileSync('test/fixtures/keys/server.pfx')
};

var port = 8089;
https.createServer(options, function (req, res) {
	var now = new Date();
	console.log(now + ' ~ req.url =', req.url);
  res.writeHead(200);
  res.end(now + " ~ Hello World\n");
}).listen(port);

console.log('Https svr is running on port:', port, '...');

