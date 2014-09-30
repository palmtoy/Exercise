"use strict";


var doConvert = function(k, v) {
  var tmp = {};
  tmp[k] = {
    value: v
  };
  return Object.defineProperties({}, tmp);
};


var constsObj = doConvert('MAX_RAGE', 200);
console.log('constsObj = ', JSON.stringify(constsObj));

console.log('AAA ~ constsObj.MAX_RAGE = ', JSON.stringify(constsObj.MAX_RAGE));
constsObj.MAX_RAGE = 999;
console.log('BBB ~ constsObj.MAX_RAGE = ', JSON.stringify(constsObj.MAX_RAGE));

