// $ ab -n10 -c5 'http://127.0.0.1:8000/'
/*
	Open 'Activity Monitor':
	Before ab testing, there are 6 threads in the Node.js process.
	After ab testing, there are 10 threads in the Node.js process.
	! Surprise ! -- All zlib APIs, other than those that are explicitly synchronous, use the libuv's threadpool.
*/

const http = require('http');
const zlib = require('zlib');

const port = 8000;

http.createServer((req, response) => {
	// For the sake of simplicity, the Accept-Encoding checks are omitted.
	response.writeHead(200, { 'content-encoding': 'gzip' });
	const output = zlib.createGzip();
	output.pipe(response);

	setInterval(() => {
		output.write(`Hello World\nThe current time is ${Date()}\n\n`, () => {
			// The data has been passed to zlib, but the compression algorithm may
			// have decided to buffer the data for more efficient compression.
			// Calling .flush() will make the data available as soon as the client
			// is ready to receive it.
			output.flush();
		});
	}, 1000);
}).listen(port, () => {
	console.log('HTTP server(zlib) is listening on ' + port + ' ...');
});

