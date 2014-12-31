var dataPath = './data.json';

var dataModule = require(dataPath);
console.log('dataModule = ', dataModule);

var tmpPath = require.resolve(dataPath);
console.log('tmpPath = ', tmpPath);

