var http = require('http');

var port = 8080;

var postHTML = 
	'<html><head><title>Post Example</title></head>' +
	'<body>' +
	'<form method="post">' +
	'Param_1: <input name="FirstParam"><br><br>' +
	'Param_2: <input name="SecondParam"><br><br>' +
	'<input type="submit">' +
	'</form>' +
	'</body></html>';

http.createServer(function (req, res) {
	var body = "";

	if(req.method === 'POST') {
		req.on('data', function (chunk) {
			body += chunk;
		});
		req.on('end', function () {
			console.log('Method POST:');
			console.log('Data:' + body + '\n');
			res.writeHead(200);
			res.end(postHTML);
		});
	}
}).listen(port);

console.log('Http svr is listening on port:', port, '...\n');
