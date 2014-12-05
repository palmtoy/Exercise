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


var lodash = require('lodash');

var tmpObj = {
  equipment: {
    '30000':
      {
        economy_id: 'M_WPN_EP_30',
        inventory_id: 30000
      }
  }
};

tmpObj = lodash.merge(tmpObj, targetObj);
tmpObj.inventory['11476'].inventory_id = 20000;
tmpObj.gemList[0].blue[0].PATK = 9;

console.log('targetObj = ', JSON.stringify(targetObj));
console.log('\n\n');
console.log('   tmpObj = ', JSON.stringify(tmpObj));

