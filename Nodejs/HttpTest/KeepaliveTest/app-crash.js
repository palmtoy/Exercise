const http = require('http');
const urllib = require('urllib');

const port = 3000;

const server = http.createServer((req, res) => {
	res.end('Hello World, ' + req.connection.remotePort);
});

server.on('clientError', (err, socket) => {
	socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(port);

//////////////////////////////////////////////////////////////////////////

const keepaliveAgent = new http.Agent({
	keepAlive: true,
});

const funcRequest = () => {
	const reqUrl = 'http://127.0.0.1:' + port;
	urllib.request(reqUrl, {
		agent: keepaliveAgent,
		dataType: 'text',
	}, (err, data, res) => {
		if (err) {
			console.error('Wow ~ error: %s, status: %s', err, res.status, '\n', res);
			throw err;
		}
		console.log('status: %s, data: %s', res.status, data, '\n', res, '\n');
	});
}


setInterval(funcRequest, 5000);

funcRequest();

