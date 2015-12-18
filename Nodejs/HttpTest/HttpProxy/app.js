// simple load balancer

var http = require('http'),
httpProxy = require('http-proxy');

var proxyPort = 80
	, httpPortList = [32771, 32772];

var proxy = httpProxy.createProxyServer({});

var i = 0;
var server = http.createServer(function(req, res) {
	proxy.web(req, res, { target: 'http://127.0.0.1:' + httpPortList[i] });
	i = (i + 1) % httpPortList.length;
});

server.listen(proxyPort);
console.log('HttpProxy is listening on port:', proxyPort, '...');

