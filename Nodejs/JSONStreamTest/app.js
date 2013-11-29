var fs = require('fs')
  , JSONStream = require('JSONStream');

var fsStream = fs.createReadStream('./data.json', {encoding: 'utf8'});
// var jStream = JSONStream.parse(['rows', true, 'doc'])
var jStream = JSONStream.parse(['rows', true])

// var stringify = JSONStream.stringify();
var stringify = JSONStream.stringify(false);
stringify.pipe(process.stdout);


fsStream.pipe(jStream);

jStream.on('data', function(data) {
  // console.log('jStream.on:data is running ...');
  if (data.doc.hello !== 1) {
    stringify.write([ data.doc._id, data.doc._rev ]);
  }
});

jStream.on('root', function(root, count) {
  // console.log('\njStream.on:root is running ...');
  if (!count) {
    console.log('no matches found:', root);
  } else {
    // console.log('root = ', root);
    // console.log('count = ', count);
  }
});

jStream.on('end', function () {
  stringify.end();
  console.log('\n');
});

