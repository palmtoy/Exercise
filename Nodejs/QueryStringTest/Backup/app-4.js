var dataPath = './data.js';

var dataModule = require(dataPath);
console.log('dataModule = ', dataModule);

var tmpPath = require.resolve(dataPath);
console.log('tmpPath = ', tmpPath);

console.log('app.js ~ __filename = ', __filename);

