/*
	 curl -v http://127.0.0.1:38086\?platform\=raspberrypi&ip\=127.0.0.1
*/

const http = require('http');
const url = require('url');
const svrPort = 38086;

http.createServer(function (req, res) {
	const queryData = url.parse(req.url, true).query;
	const now = new Date() + ' ~ ';
	const tmpData = {'Content-Type': 'text/plain'};
	if (queryData.ip && queryData.platform) {
		res.writeHead(200, tmpData);
		console.log(`${now}Client\'s platform: ${queryData.platform}, Client\'s IP: ${queryData.ip}`);
	} else {
		res.writeHead(400, tmpData);
		console.log(now + 'Bad Request: QueryData = ' + JSON.stringify(queryData));
	}
	res.end();
}).listen(svrPort);

console.log(`Server running at port:${svrPort} ...`);

