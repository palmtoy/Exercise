/*

kill -SIGUSR2 <pid>
http://localhost:8080/inspector.html?host=localhost:9999&page=0

*/

var agent = require('webkit-devtools-agent');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/26.0.1410.65'));
app.listen(8080);
console.log('[%s] Server running at http://127.0.0.1:8080/', process.pid);


var x = 0;

var func_xyt = function() {
  for(var i = 0; i < 1000; i++) {
    console.log('x = ', x);
  }
  x++;
};

setInterval(func_xyt, 2000);


/*
var ClassA = function(name){
  this.name = name;
  this.func = null;
};

var a = new ClassA("a");
var b = new ClassA("b");

b.func = bind(function(){
  console.log("I am " + this.name);
}, a);

b.func();  // 输出 I am a

a = null;        // 释放a
// b = null;        // 释放b

// 模拟上下文绑定
function bind(func, self){
  return function(){
    return func.apply(self);
  };
}; 
*/

