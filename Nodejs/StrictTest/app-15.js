"use strict";


var doConvert = function(k, v) {
  var tmp = {};
  tmp[k] = {
    value: v
  };
  return Object.defineProperties({}, tmp);
};


var constsObj = {
  COMBAT: {
    MAX_RAGE: 200
  }
};


var convertFunc = function(srcObj) {
  for(var p in srcObj) {
    if(srcObj.hasOwnProperty(p)) {
      var v = srcObj[p];
      if(v && v.constructor === Object) {
        convertFunc(v);
      } else {
        srcObj = doConvert(p, v);
      }
    }
  }
};

console.log('constsObj = ', JSON.stringify(constsObj));

console.log('AAA ~ constsObj.COMBAT.MAX_RAGE = ', JSON.stringify(constsObj.COMBAT.MAX_RAGE));
constsObj.COMBAT.MAX_RAGE = 999;
console.log('BBB ~ constsObj.COMBAT.MAX_RAGE = ', JSON.stringify(constsObj.COMBAT.MAX_RAGE));

