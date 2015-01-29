var http = require('http');
var HTTPClient = require('HTTPClient.js');
var port = 8081;

var options = {
  hostname: 'localhost',
  path: '/',
  port: 8080,
  secure: false,
  method: 'GET',
  headers: {
    'x-powered-by': 'HTTPClient.js'
  }
};

http.createServer(function (req, res) {
  res.writeHead(200, {});

  new HTTPClient(options)
  .request('/echo?name=palmtoy', function(err, tmpRes, body) {
    res.write(body);
    res.end();
  });
}).listen(port);

console.log('HTTP server is running on port:' + port + ' ...');

