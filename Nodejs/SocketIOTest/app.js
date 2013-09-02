var app = require('express')()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	, utils = require('./utils');

server.listen(8080);

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my_other_event', function (data) {
		utils.myPrint('2 ~ data = ', JSON.stringify(data));
		console.log(data);
	});
});
