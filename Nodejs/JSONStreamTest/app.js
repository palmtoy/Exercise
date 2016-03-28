var fs = require('fs')
  , JSONStream = require('JSONStream');

var fsStream = fs.createReadStream('./data.json', {encoding: 'utf8'});
// var jStream = JSONStream.parse(['titles', true])
// var jStream = JSONStream.parse(['titlesInCN', true])
var jStream = JSONStream.parse(['rows', true])


fsStream.pipe(jStream);

jStream.on('data', function(data) {
  console.log('jStream.on:data is running ...');
  console.log('received:', data);
  console.log('\n');
});

jStream.on('root', function(root, count) {
  console.log('jStream.on:root is running ...');
  if (!count) {
    console.log('no matches found:', root);
  } else {
    console.log('root = ', root); // whatever you will do with each JSON object
    console.log('count = ', count);
    console.log('\n');
  }
});

