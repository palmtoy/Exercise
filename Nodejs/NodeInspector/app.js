/*
$ npm install -g node-inspector
$ node-inspector &
$ node --debug-brk app.js
http://127.0.0.1:8080/debug?port=5858
*/

var foo = function(n) {
  var sum = 0
  for(var i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

var ret = foo(100);
console.log('ret =', ret);

