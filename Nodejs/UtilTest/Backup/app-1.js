var util = require('util');

var obj = { name: 'nate' };

var str = util.inspect(obj);
console.log(str); // "{ name: 'nate' }"


obj.inspect = function(depth) {
  return '{' + this.name + '}';
};

str = util.inspect(obj);
console.log(str); // "{nate}"

