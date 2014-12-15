var utils = require('./utils');
var underscore = require('underscore');

var srcObj = function() {console.log('hi');};

if (underscore.isObject(srcObj)) {
  console.log('Yes, obj');
}

if(underscore.isArray(srcObj)) {
  console.log('Yes, arr');
}


var newObj = utils.deepClone(srcObj);

console.log('      newObj    = ', JSON.stringify(newObj), '\n\n');

console.log('BBB ~ srcObj    = ', JSON.stringify(srcObj));
