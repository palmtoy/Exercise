// $ ab -n10 -c5 'http://127.0.0.1:8000/'
/*
	Open 'Activity Monitor':
	Before ab testing, there are 6 threads in the Node.js process.
	After ab testing, there are 10 threads in the Node.js process.
*/

const http = require('http');
const fs = require('fs');

const port = 8000;

http.createServer((req, res) => {
	fs.readFile('./data.json', (err, data) => {
		if (err) throw err;
		res.end(data + '\n' + new Date());
	});
}).listen(port, () => {
	console.log('HTTP server is listening on ' + port + ' ...');
});

