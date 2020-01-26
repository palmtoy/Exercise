/*
	 curl -kv http://127.0.0.1:30086\?os_platform\=raspberrypi&os_ip\=127.0.0.1
*/

const https = require('https');
const fs = require('fs');
const url = require('url');
const svrPort = 8086;


const options = {
  key: fs.readFileSync('CA/agent-key.pem'),
  cert: fs.readFileSync('CA/agent-cert.pem'),
};

https.createServer(options, function (req, res) {
	const queryData = url.parse(req.url, true).query;
	const now = new Date() + ' ~ ';
	const cliRealIp = req.connection.remoteAddress;
	console.log(`${now}Client real IP: ${cliRealIp}`);
	const tmpData = {'Content-Type': 'text/plain'};
	if (queryData.os_platform && queryData.os_ip) {
		res.writeHead(200, tmpData);
		console.log(`${now}Client platform: ${queryData.os_platform}, Client reported IP: ${queryData.os_ip}\n`);
	} else {
		res.writeHead(400, tmpData);
		console.log(`${now}Bad Request: QueryData = ${JSON.stringify(queryData)}\n`);
	}
	res.end();
}).listen(svrPort);

console.log(`Https server running at port:${svrPort} ...\n`);

