const http = require('http');

const port = 8080;

http.createServer((request, response) => {
	if (request.method === 'POST' && request.url === '/echo') {
		let body = [];
		request.on('data', chunk => {
			body.push(chunk);
			const now = new Date();
			console.debug(`\n${now} ~ Svr received chunk: ${chunk}`);
		}).on('end', () => {
			body = Buffer.concat(body).toString();
			const now = new Date();
			console.debug(`${now} ~ Svr received msg: ${body}\n`);
			response.end(`${now} ~ ${body}`);
		});
	} else {
		response.statusCode = 404;
		response.end(response.statusCode.toString() + ' NOT FOUND\n');
	}
}).listen(port);

console.info(`HTTP is running on port ${port} ...`);


/*

curl -X POST -d "useId=5cdx87&data={name:palmtoy}" http://127.0.0.1:8080/echo
curl -v -d "useId=5cdx87&data={name:palmtoy}" http://127.0.0.1:8080/echo

*/

