var fs = require('fs');

// var rs = fs.createReadStream('LiBai.md');
var rs = fs.createReadStream('LiBai.md', {highWaterMark: 11});
// rs.setEncoding('utf8');

var data = '';

rs.on('data', function(trunk) {
  data += trunk;
  console.log(trunk);
});

rs.on('end', function() {
  console.log(data);
});
