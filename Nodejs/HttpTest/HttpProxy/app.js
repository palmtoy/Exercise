var http = require('http'),
httpProxy = require('http-proxy');

var proxyPort = 5050
	, httpPort = 5060;
// 
// Create a proxy server with custom application logic 
// 
var proxy = httpProxy.createProxyServer({});

// 
// Create your custom server and just call `proxy.web()` to proxy 
// a web request to the target passed in the options 
// also you can use `proxy.ws()` to proxy a websockets request 
// 
var server = http.createServer(function(req, res) {
	// You can define here your custom logic to handle the request 
	// and then proxy the request. 
	proxy.web(req, res, { target: 'http://127.0.0.1:' + httpPort });
});

server.listen(proxyPort);
console.log('HttpProxy is listening on port:', proxyPort, '...');


http.createServer(function (req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
	res.end();
}).listen(httpPort);
console.log("Http svr is listening on port:", httpPort, '...')

