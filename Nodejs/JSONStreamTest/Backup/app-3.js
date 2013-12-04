var fs = require('fs')
  , JSONStream = require('JSONStream');

var stream = fs.createReadStream('data.json', {encoding: 'utf8'});
var parser = JSONStream.parse(['rows', true, 'doc']);

stream.pipe(parser);

parser.on('data', function (obj) {
  console.log('parser.on:data is running ...');
  console.log(obj);
  console.log('\n');
});

parser.on('root', function (obj) {
  console.log('parser.on:root is running ...');
  console.log(obj); // whatever you will do with each JSON object
  console.log('\n');
});

