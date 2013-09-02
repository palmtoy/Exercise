var Loader = require('pomelo-loader');

var res = Loader.load('./remote');

console.log('res: %j', res);

var keys = Object.keys(res);
console.log('keys = ', keys);

var obj = res[keys[0]];
var funcNameL = Object.keys(obj);
console.log('funcNameL = ', funcNameL);

var func1 = obj[funcNameL[0]];
var func2 = obj[funcNameL[1]];
console.log('func1 = ', func1);
console.log('func2 = ', func2);

