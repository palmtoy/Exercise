var app = require('express')()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	, utils = require('./lib/utils');

var agent = require('webkit-devtools-agent');


app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

app.get('/mem', function (req, res) {
	res.sendfile(__dirname + '/public/memLeak.html');
});

io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my_other_event', function (data) {
		utils.myPrint('2 ~ data = ', JSON.stringify(data));
		console.log(data);
	});
});

server.listen(8080);
console.log('[pid=%s] Server running at http://localhost:8080/', process.pid);


var net = require("net"),
    repl = require("repl");

net.createServer(function (socket) {
  repl.start({
    prompt: "ExpressHttpSvr ~ > ",
    input: socket,
    output: socket
  }).on('exit', function() {
    socket.end();
  });
}).listen(8081);


// running ~ begin
var ClassA = function(name){
	this.name = name;
	this.func = null;
};

var func_lzg = function() {
	for(var i = 0; i < 2000; i++){
	  var obj = new ClassA("z");
    obj.name = 'zz';
    console.log(' \b\b');
	}
};

var i = 0;
var a, b;
setInterval(function() {
	console.log(Date.now());
	a = new ClassA("a");
	b = new ClassA("b");

	b.func = bind(function(){
		console.log("I am " + this.name + ' ~ ' + i++);
	}, a);

	b.func();  // 输出 "I am a"

	a = null;        // 释放a
	// b = null;     // 释放b
	// b.func = null;   // 释放self
	func_lzg();
}, 1000);


// 模拟上下文绑定
function bind(func, self){
	return function(){
		return func.apply(self);
	};
}; 

// running ~ end

