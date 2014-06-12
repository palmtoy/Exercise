/*
nc -U /tmp/echo.sock
*/

var net = require('net');
var exec = require('child_process').exec;

var NamedSock = '/tmp/echo.sock';
var tmpCmd = 'rm ' + NamedSock;

exec(tmpCmd,
     function (error, stdout, stderr) {
       if (error !== null) {
         console.error('exec error: ' + error);
       }
     });

var server = net.createServer();
server.listen(NamedSock);

server.on('connection', function(sock) {
    // 我们获得一个连接 - 该连接自动关联一个socket对象
    console.log('\nCONNECTED: ' + NamedSock + '\n');

    // 为这个socket实例添加一个"data"事件处理函数
    sock.on('data', function(data) {
        console.log('DATA ' + ': ' + data);
        // 回发该数据，客户端将收到来自服务端的数据
        sock.write('You said :' + data + '\n');
    });

    // 为这个socket实例添加一个"close"事件处理函数
    sock.on('close', function(data) {
        console.log('CLOSED: ' + NamedSock + '\n');
    });
});

console.log('Server listening on ' + ':'+ NamedSock);

// Uncaught exception handler
process.on('uncaughtException', function(e) {
  console.error('Caught exception: ' + e.stack);
});
