var utils = require('./utils');

var srcObj = {'key': 'value'};

var targetObj = [1, 3, 5];

var newObj = utils.deepExtend(targetObj, srcObj);

console.log('newObj    = ', JSON.stringify(newObj), '\n\n');

console.log('srcObj    = ', JSON.stringify(srcObj), '\n\n');

console.log('targetObj = ', JSON.stringify(targetObj));

