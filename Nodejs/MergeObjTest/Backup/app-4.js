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
    {blue: [{id: 101, PATK: 9}, {id: 102, PATK: 8}]},
    {red: [{id: 201, PATK: 7}, {id: 202, PATK: 5}]}
  ]

};


function deepClone(obj) {
  var o, i, j, k;
  if(typeof(obj) !== "object" || obj === null) {
    return obj;
  }
  if(obj instanceof(Array)) {
    o = [];
    i = 0;
    j = obj.length;
    for(; i < j; i++) {
      if(typeof(obj[i]) === "object" && obj[i] !== null) {
        o[i] = deepClone(obj[i]);
      } else {
        o[i] = obj[i];
      }
    }
  } else {
    o = {};
    for(i in obj) {
      if(typeof(obj[i]) === "object" && obj[i] !== null) {
        o[i] = deepClone(obj[i]);
      } else {
        o[i] = obj[i];
      }
    }
  }

  return o;
}


tmpObj = deepClone(targetObj);
tmpObj.inventory['11476'].inventory_id = 10000;
tmpObj.gemList[0].blue[0].PATK = 999;

console.log('   tmpObj = ', JSON.stringify(tmpObj));
console.log('\n\n');
console.log('targetObj = ', JSON.stringify(targetObj));

