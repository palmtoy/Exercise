var fs = require('fs')
  , JSONStream = require('JSONStream')
  , es = require('event-stream');


var stream = JSONStream.parse(['rows', true, 'doc']) //rows, ANYTHING, doc
  , logger = es.mapSync(function (data) {
      console.log(data)
      return data
    });


stream.on('data', function(data) {
  console.log('received:', data);
  console.log('data = ', data.toString());
});

stream.on('root', function(root, count) {
  if (!count) {
    console.log('no matches found:', root);
  }
});


fs.readFile('./data.json', function (err, data) {
  if (err) throw err;
  stream.emit('data', data);
});

