// openssl s_client -connect 127.0.0.1:8000

var tls = require('tls');
var fs = require('fs');

var options = {
  key: fs.readFileSync('../test/fixtures/keys/server-key.pem'),
  cert: fs.readFileSync('../test/fixtures/keys/server-cert.pem'),

  // This is necessary only if using the client certificate authentication.
  requestCert: true,

  // This is necessary only if the client uses the self-signed certificate.
  ca: [ fs.readFileSync('../test/fixtures/keys/client-cert.pem') ]
};

console.log('options.ca = ', options.ca.toString());

var server = tls.createServer(options, function(cleartextStream) {
  console.log('cleartextStream = ', cleartextStream);

  console.log('server connected',
              cleartextStream.authorized ? 'authorized' : 'unauthorized');
  cleartextStream.write("\nwelcome!\n");
  cleartextStream.setEncoding('utf8');
  cleartextStream.pipe(cleartextStream);
});

server.listen(8000, function() {
  console.log('server bound');
});

