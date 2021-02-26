const http = require('http'),
	httpProxy = require('http-proxy');

const srvPort = 8000, targetPort = 9000;

// Create target server
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
	const tmpJson = {
		tips: 'request proxied!' + ' ~ ' + JSON.stringify(req.headers),
		foo: 'bar'
	};
  res.write(JSON.stringify(tmpJson));
  res.end();
}).listen(targetPort);

// Create proxy server and set the target in the options
// Invoking listen(..) triggers the creation of a web server. Otherwise, just the proxy instance is created
const proxySrv = httpProxy.createProxyServer({
	target: 'http://localhost:' + targetPort,
	selfHandleResponse : true
});
 
proxySrv.on('proxyRes', function (proxyRes, req, res) {
	const bodyList = [];
	proxyRes.on('data', function (chunk) {
		bodyList.push(chunk);
	});

	proxyRes.on('end', function () {
		const strBody = Buffer.concat(bodyList).toString();
		const jsonBody = JSON.parse(strBody);
		console.log('res from proxied server: %o', jsonBody);
		res.setHeader('Content-Type', 'application/json');
		jsonBody.foo = jsonBody.foo + ' ~ ' + new Date();
		jsonBody.hello = 'world';
		res.end(JSON.stringify(jsonBody));
	});
});


const httpServer = http.createServer(function(req, res) {
	proxySrv.web(req, res);
});
httpServer.listen(srvPort);


console.log(`Http server is running on port ${srvPort} ...`);

