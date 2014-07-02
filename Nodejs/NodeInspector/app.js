/*
$ npm install -g node-inspector
$ node-inspector &
$ node --debug-brk app.js
http://127.0.0.1:8080/debug?port=5858
*/

var FuncAdd = function(paramA, paramB) {
  var sum = paramA + paramB;
  return sum;
}

var ret = FuncAdd(1, 2);
console.log('ret =', ret);

