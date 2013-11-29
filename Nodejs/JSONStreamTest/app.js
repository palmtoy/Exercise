var fs = require('fs')
  , JSONStream = require('JSONStream');

var fsStream = fs.createReadStream('data.json', {encoding: 'utf8'});
var stream = JSONStream.parse(['rows', true, 'doc']) //rows, ANYTHING, doc

fsStream.pipe(stream);

stream.on('data', function(data) {
  console.log('stream.on:data is running ...');
  console.log('received:', data);
  console.log('\n');
});

stream.on('root', function(root, count) {
  console.log('stream.on:root is running ...');
  if (!count) {
    console.log('no matches found:', root);
  } else {
    console.log('root = ', root); // whatever you will do with each JSON object
    console.log('count = ', count);
    console.log('\n');
  }
});

