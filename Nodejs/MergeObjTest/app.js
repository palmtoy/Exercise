var targetObj = {

  inventory: {
    '11476': 
      { economy_id: 'W_WPN_EP_20',
        inventory_id: 11476
      } 
  },

  equipment: {
    '11477': 
      { 
      economy_id: 'M_WPN_EP_40',
      inventory_id: 11477
    }
  },

  gemList: [
    {blue: [{id: 101, PATK: 6}, {id: 102, PATK: 8}]},
    {red: [{id: 201, PATK: 7}, {id: 202, PATK: 5}]}
  ]

};


function deepExtend(desObj, srcObj) {
  var doExtend = function(k) {
    // Property in destination object set; update its value.
    if(typeof srcObj[k] === "object" && srcObj[k] !== null) {
      desObj[k] = deepExtend(desObj[k], srcObj[k]);
    } else {
      desObj[k] = srcObj[k];
    }
  };

  if(typeof srcObj !== "object" || srcObj === null) {
    return desObj;
  }

  if(srcObj instanceof Array) {
    desObj = desObj || [];
    if(desObj instanceof Array) {
      for(var i = 0; i < srcObj.length; i++) {
        doExtend(i);
      }
    }
  } else {
    desObj = desObj || {};
    if(desObj instanceof Object) {
      for (var p in srcObj) {
        if (srcObj.hasOwnProperty(p)) {
          doExtend(p);
        }
      }
    }
  }

  return desObj;
};


var tmpObj = {};
tmpObj = deepExtend(tmpObj, targetObj);
tmpObj.inventory['11476'].inventory_id = 20000;
tmpObj.gemList[0].blue[0].PATK = 9;

console.log('targetObj = ', JSON.stringify(targetObj));
console.log('\n\n');
console.log('   tmpObj = ', JSON.stringify(tmpObj));

