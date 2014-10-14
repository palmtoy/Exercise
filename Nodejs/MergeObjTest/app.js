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


function deepExtend(obj) {
  var doExtend = function(k) {
    if(typeof(obj[k]) === "object" && obj[k] !== null) {
      o[k] = deepExtend(obj[k]);
    } else {
      o[k] = obj[k];
    }
  };

  var o, i, j;

  if(typeof(obj) !== "object" || obj === null) {
    return obj;
  }
  if(obj instanceof(Array)) {
    o = [];
    i = 0;
    j = obj.length;
    for(; i < j; i++) {
      doExtend(i);
    }
  } else {
    o = {};
    for(i in obj) {
      doExtend(i);
    }
  }

  return o;
}


var tmpObj = deepExtend(targetObj);
tmpObj.inventory['11476'].inventory_id = 20000;
tmpObj.gemList[0].blue[0].PATK = 8;

console.log('targetObj = ', JSON.stringify(targetObj));
console.log('\n\n');
console.log('   tmpObj = ', JSON.stringify(tmpObj));

