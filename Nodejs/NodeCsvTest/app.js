// node samples/sample.js

var fs = require('fs');
var csv = require('csv');

console.log('__dirname = ', __dirname, '\n');

csv()
.from.path(__dirname + '/sample.in', { delimiter: ',', escape: '"' })
.to.stream(fs.createWriteStream(__dirname+'/sample.out'))
.on('record', function(row, index){
  console.log('typeof row = ', typeof row);
  console.log('row.length = ', row.length);
  console.log('#' + index + ' ' + JSON.stringify(row));
})
.on('close', function(count){
  // when writing to a file, use the 'close' event
  // the 'end' event may fire before the file has been written
  console.log('\nNumber of lines: '+count);
})
.on('error', function(err){
  console.error(err.message);
});

