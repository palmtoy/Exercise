// node samples/sample.js

var csv = require('csv');

csv()
.from.path(__dirname + '/sample.in', { delimiter: ',', escape: '"' })
.on('record', function(row, index){
  console.log('#' + index + ' ' + JSON.stringify(row));
})
.on('error', function(err){
  console.error(err.message);
});

