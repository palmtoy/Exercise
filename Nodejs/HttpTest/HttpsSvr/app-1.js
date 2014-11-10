/*

For development purposes you can create a self-certified certificate. Here's how to do it on a linux-based system:

First, generate a private key

openssl genrsa 1024 > key.pem
This will store a 1024 bit RSA key in the file key.pem

Then, generate an SSL certificate with that key:

openssl req -x509 -new -key key.pem > key-cert.pem
Now, you can use key.pem and key-cert.pem in the options you pass to createServer.

*/


// openssl genrsa 1024 > agent2-key.pem
// openssl req -x509 -new -key agent2-key.pem > agent2-cert.pem

// curl -k https://localhost:8000/

var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};

var port = 8000;
https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(port);

console.log('Https svr is running on port:', port, '...');

