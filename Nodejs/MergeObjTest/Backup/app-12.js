var utils = require('./utils');

var srcObj = {"items":[{"type":"gaminventory","data":"ITM_ENCHANT_LuckStone_3","quantity":1}]};

console.log('srcObj    = ', JSON.stringify(srcObj));
console.log('\n\n');

var targetObj = {"items":[{"type":"res","data":"gold","quantity":1000,"balance":1000}]}; 

console.log('targetObj = ', JSON.stringify(targetObj));
console.log('\n\n');

var newObj = utils.deepExtend(targetObj, srcObj);
newObj.items[0].balance = 999;

console.log('newObj    = ', JSON.stringify(newObj));

