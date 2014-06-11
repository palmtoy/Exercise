var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var fs = require('fs');
var rs = fs.createReadStream('LiBai.md', {highWaterMark: 11});

var chunks = [];
var size = 0;

rs.on('data', function(chunk) {
  chunks.push(chunk);
  size += chunk.length;
  console.log('size = ', size);
});

rs.on('end', function() {
  console.log('\n');
  var buf = Buffer.concat(chunks, size);
  var str = decoder.write(buf);
  console.log(str);
});

