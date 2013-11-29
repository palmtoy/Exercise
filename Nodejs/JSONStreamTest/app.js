var fs = require('fs');
var s = fs.createReadStream('data.json');
var JSONStream = require('JSONStream');

var stringify = JSONStream.stringify();
stringify.pipe(process.stdout);

var parser = JSONStream.parse([ true ]);

parser.on('data', function (row) {
  if (row._typeGroup === 'entities') {
    stringify.write([ row.name, row.relevance ]);
  }
});

parser.on('end', function () {
  stringify.end();
});

s.pipe(parser);
