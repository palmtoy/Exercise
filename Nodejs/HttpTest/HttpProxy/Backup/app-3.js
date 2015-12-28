var http = require('http'),
httpProxy = require('http-proxy');

var proxyPort = 80
	, httpPort = 32772;

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function(req, res) {
	proxy.web(req, res, { target: 'http://127.0.0.1:' + httpPort });
});

server.listen(proxyPort);
console.log('HttpProxy is listening on port:', proxyPort, '...');

