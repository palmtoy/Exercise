// simple load balancer

var http = require('http'),
httpProxy = require('http-proxy');

var proxyPort = 8080
	, httpPortList = [32768, 32769];

var proxy = httpProxy.createProxyServer({});

var i = 0;
var server = http.createServer(function(req, res) {
	i = (i + 1) % httpPortList.length;
	proxy.web(req, res, { target: 'http://127.0.0.1:' + httpPortList[i] });
});

server.listen(proxyPort);
console.log('HttpProxy is listening on port:', proxyPort, '...');

