var fs = require('fs')
  , JSONStream = require('JSONStream');

var fsStream = fs.createReadStream('./data.json', {encoding: 'utf8'});

var jStream = JSONStream.parse(['rows', true, 'doc', {emitKey: true}]) //rows, ANYTHING, doc, items in docs with keys 
 
jStream.on('data', function(data) {
  console.log('jStream.on:data is running ...');
  console.log('key:', data.key);
  console.log('value:', data.value);
  console.log('\n');
});


fsStream.pipe(jStream);

