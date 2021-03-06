// openssl s_client -connect 127.0.0.1:8000

var tls = require('tls');
var fs = require('fs');

var options = {
  pfx: fs.readFileSync('../test/fixtures/keys/server.pfx'),

  // This is necessary only if using the client certificate authentication.
  requestCert: true,
};

var server = tls.createServer(options, function(cleartextStream) {
  console.log('server connected',
              cleartextStream.authorized ? 'authorized' : 'unauthorized');
  cleartextStream.write("Welcome!\n");
  cleartextStream.setEncoding('utf8');
  cleartextStream.pipe(cleartextStream);
});
server.listen(8000, function() {
  console.log('server bound');
});

