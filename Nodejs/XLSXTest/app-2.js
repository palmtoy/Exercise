var buffer = require('fs').readFileSync('./TestTableReference-saveas.xlsx');

var ret = {};

ret.xlsx = require('xlsx').read(buffer).Sheets;

ret.node_xlsx = require('node-xlsx').parse(buffer).worksheets;
console.log(JSON.stringify(ret));

