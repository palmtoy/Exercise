const http = require('http');

const port = 8080;

http.createServer((request, response) => {

	request.on('error', err => {
		console.error(err);
		response.statusCode = 400;
		response.end(response.statusCode.toString());
	});

	if (request.method === 'POST' && request.url === '/echo') {
		request.pipe(response);
	} else {
		response.statusCode = 404;
		response.end(response.statusCode.toString());
	}

}).listen(port);

console.info(`HTTP is running on port ${port} ...`);


/*

curl -X POST -d "useId=5cdx87&data={name:palmtoy}" http://127.0.0.1:8080/echo

*/

