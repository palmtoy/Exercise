var utils = require('./utils');

var srcObj = [{"type":"gaminventory"}];

console.log('srcObj    = ', JSON.stringify(srcObj));
console.log('\n\n');

var newObj = utils.deepClone(srcObj);
newObj[0].name = 'weapon';

console.log('newObj    = ', JSON.stringify(newObj));

