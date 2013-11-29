var fs = require('fs')
  , JSONStream = require('JSONStream');

var stream = fs.createReadStream('data.json', {encoding: 'utf8'});
parser = JSONStream.parse();

stream.pipe(parser);

parser.on('root', function (obj) {
  console.log(obj); // whatever you will do with each JSON object
});
