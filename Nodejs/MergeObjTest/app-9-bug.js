var utils = require('./utils');

var srcObj = {"items":[{"type":"gaminventory","data":"GEM_PDEF_2","quantity":1,"result":{"uid":1001440,"economy_id":"GEM_PDEF_2","system":"Gem","inventory_id":17452,"num":1,"location":"bag_items","cell":1,"_ts":1417749506,"_id":"54812402292ca90000667b92"}},{"type":"res","data":"gold","quantity":1000,"balance":1000},{"type":"gaminventory","data":"ITM_ENCHANT_LuckStone_2","quantity":1,"result":{"uid":1001440,"economy_id":"ITM_ENCHANT_LuckStone_2","system":"LuckStone","inventory_id":17453,"num":1,"location":"bag_items","cell":1,"_ts":1417749506,"_id":"54812402292ca90000667b94"}},{"type":"gaminventory","data":"GEM_PATK_1","quantity":1,"result":{"uid":1001440,"economy_id":"GEM_PATK_1","system":"Gem","inventory_id":17454,"num":1,"location":"bag_items","cell":1,"_ts":1417749506,"_id":"54812402292ca90000667b95"}}]}; 

console.log('srcObj = ', JSON.stringify(srcObj));
console.log('\n\n');

var targetObj = {"items":[{"type":"gaminventory","data":"ITM_ENCHANT_LuckStone_3","quantity":1,"result":{"uid":1001440,"economy_id":"ITM_ENCHANT_LuckStone_3","system":"LuckStone","inventory_id":17451,"num":1,"location":"bag_items","cell":1,"_ts":1417749506,"_id":"54812402292ca90000667b91"}}]};

console.log('   targetObj = ', JSON.stringify(targetObj));
console.log('\n\n');

var newObj = utils.deepExtend(targetObj, srcObj);

console.log('   newObj = ', JSON.stringify(newObj));

