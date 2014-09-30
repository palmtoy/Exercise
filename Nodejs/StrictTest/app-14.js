"use strict";


var doConvert = function(k, v) {
  var tmp = {};
  tmp[k] = {
    value: v
  };
  return Object.defineProperties({}, tmp);
};

var convertFunc = function(srcObj) {
  for (var p in srcObj) {
    if (srcObj.hasOwnProperty(p)) {
      try {
        // Property in destination object set; update its value.
        if(srcObj[p] && srcObj[p].constructor === Object) {
          convertFunc(srcObj[p]);
        } else {
          srcObj[p] = doConvert(p, srcObj[p]);
        }
      } catch(e) {
        console.error('e = %j', e);
      }
    }
  }
};


var constsObj = {
  COMBAT: {
    MAX_RAGE: 200,

    MAX_NUM_FOR_SKILLBAR: 5,

    SKILLS_ARRAY_FOR_WARRIOR: [
      {
        name: 'SKILL_W_Slasher',
        level: 1
      },
      {
        name: 'SKILL_W_HeartRage',
        level: 1
      }
    ]
  }
};

convertFunc(constsObj);
console.log('constsObj = ', JSON.stringify(constsObj));

console.log('AAA ~ constsObj.COMBAT.MAX_RAGE = ', JSON.stringify(constsObj.COMBAT.MAX_RAGE));
constsObj.COMBAT.MAX_RAGE = 999;
console.log('BBB ~ constsObj.COMBAT.MAX_RAGE = ', JSON.stringify(constsObj.COMBAT.MAX_RAGE));

