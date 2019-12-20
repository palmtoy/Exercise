// $ ab -n10 -c5 'http://127.0.0.1:8000/'
/*
	Open 'Activity Monitor':
	Before ab testing, there are 6 threads in the Node.js process.
	After ab testing, there are still 6 threads in the Node.js process.
  ! Attention ! -- The zip algorithm is still running on the main thread!
*/

const http = require('http');
const AdmZip = require('adm-zip');

const port = 8000;

http.createServer((req, res) => {
	const admZip = new AdmZip();
	const str = 'Hello World' + '\n' + new Date();
	admZip.addFile('http-res.txt', Buffer.alloc(str.length, str));
	const topojsonZip = admZip.toBuffer();
	res.end(topojsonZip);
}).listen(port, () => {
	console.log('HTTP server(adm-zip) is listening on ' + port + ' ...');
});

