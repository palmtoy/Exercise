const http = require('http'),
	httpProxy = require('http-proxy');

const targetPort = 9000, srvPort = 8000;

// Create target server
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(targetPort);

// Create proxy server and set the target in the options
// Invoking listen(..) triggers the creation of a web server. Otherwise, just the proxy instance is created
httpProxy.createProxyServer({target: 'http://localhost:' + targetPort}).listen(srvPort);
 
console.log(`Http server is running on port ${srvPort} ...`);

