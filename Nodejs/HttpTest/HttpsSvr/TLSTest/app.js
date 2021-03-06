// openssl s_client -connect 127.0.0.1:8000 -cert ../test/fixtures/keys/client-cert.pem -key ../test/fixtures/keys/client-key.pem

var tls = require('tls');
var fs = require('fs');

var options = {
  key: fs.readFileSync('../test/fixtures/keys/server-key.pem'),
  cert: fs.readFileSync('../test/fixtures/keys/server-cert.pem'),

  // This is necessary only if using the client certificate authentication.
  requestCert: true,

  // This is necessary only if the client uses the self-signed certificate.
  ca: [ fs.readFileSync('../test/fixtures/keys/client-cert.pem') ],

  rejectUnauthorized: true
};

// console.log('options.ca = ', options.ca.toString());

var server = tls.createServer(options, function(cleartextStream) {
  // console.log('cleartextStream = ', cleartextStream);

  console.log('server connected',
              cleartextStream.authorized ? 'authorized' : 'unauthorized', '\n');

  console.log('peerCertificate: ', cleartextStream.getPeerCertificate(), '\n');

  console.log('cipher: ', cleartextStream.getCipher(), '\n');

  console.log('address: ', cleartextStream.address(), '\n');

  console.log('remoteAddress, remotePort: ', cleartextStream.remoteAddress, cleartextStream.remotePort, '\n');

  cleartextStream.write("\nWelcome!\n");
  cleartextStream.setEncoding('utf8');
  cleartextStream.pipe(cleartextStream);
});

server.listen(8000, function() {
  console.log('server bound');
});

