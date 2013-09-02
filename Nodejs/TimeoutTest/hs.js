/*
var http = require('http');

http.createServer(function(request, response) {
	response.writeHeader(200, {'Content-Type:':'text/plain'});
	response.write('Hello\r\n');

	setTimeout(function() {
		response.end('world\r\n');
	}, 2000);
}).listen(8000);

console.log('Http server is running ...');
*/

/*
var net = require('net');

net.createServer(function(socket) {
	socket.write('hello world\n');
	socket.on('data', function(data) {
		socket.write(data.toString().toUpperCase());
	});
}).listen(8000);

console.log('Tcp server is running ...');
*/

var clients = [];

var net = require('net');
net.createServer(function(client) {
	client.write('Enter your name:\n');
	client.once('data', function(data) {
		var username = data.toString().trim();
		clients.push(client);
		broadcast(username + ' : Join!\n');
		client.on('data', function(data) {
			var text = username + ' : ' + data;
			broadcast(text); });
	});
}).listen(8000);

function broadcast(text) {
	console.log(text.trim());
	for(i = 0; i < clients.length; i++) {
		var c = clients[i];
		c.write(text);	
	}
}
console.log('Tcp server is running ...');

