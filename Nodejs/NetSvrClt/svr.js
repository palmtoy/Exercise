/*
telnet 127.0.0.1 6969
*/

var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var server = net.createServer();
server.listen(PORT, HOST);

server.on('connection', function(sock) {
    var connInfo = {remoteAddress: sock.remoteAddress, remotePort: sock.remotePort};

    // 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('\nCONNECTED: ' +
        sock.remoteAddress + ':' + sock.remotePort + '\n');

    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // 回发该数据，客户端将收到来自服务端的数据
        sock.write('You said :' + data + '\n');
    });

    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function(data) {
        console.log('CLOSED: ' +
            connInfo.remoteAddress + ' ' + connInfo.remotePort);
    });

    sock.write('Welcome ...\n');
});

console.log('Server listening on ' + HOST +':'+ PORT);

