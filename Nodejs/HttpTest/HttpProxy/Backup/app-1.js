var http = require('http'),
httpProxy = require('http-proxy');

var httpPort = 9090
	, proxyPort = 8080;

// 
// Create your proxy server and set the target in the options. 
// 
httpProxy.createProxyServer({target: 'http://localhost:' + httpPort}).listen(proxyPort);
console.log('HttpProxy is listening on port:', proxyPort, '...');

// 
// Create your target server 
// 
http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
	res.end();
}).listen(httpPort);

console.log('HttpSvr is listening on port:', httpPort, '...');
