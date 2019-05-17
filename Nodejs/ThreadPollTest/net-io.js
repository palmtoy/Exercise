// $ ab -n10 -c5 'http://127.0.0.1:8000/'
/*
	Open 'Activity Monitor':
	Before ab testing, there are 6 threads in the Node.js process.
	After ab testing, there are still 6 threads in the Node.js process.
*/

const http = require('http');

const port = 8000;

http.createServer((req, res) => {
	res.end('Hello World' + '\n' + new Date());
}).listen(port, () => {
	console.log('HTTP server is listening on ' + port + ' ...');
});

