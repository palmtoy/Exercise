var buffer = require('fs').readFileSync('./TestTableReference-saveas.xlsx');
// var buffer = require('fs').readFileSync('./TestTableReference.xlsx');


var xlsx = require('xlsx');
var data = xlsx.read(buffer);
console.log('xlsx:');
console.log(JSON.stringify(data.Sheets));
console.log('\n\n');


var obj = require('node-xlsx').parse(buffer);
console.log('node-xlsx:');
console.log(JSON.stringify(obj.worksheets));

