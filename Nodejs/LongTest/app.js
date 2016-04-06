#!/usr/bin/env node
var Long = require('long');

var longVal = new Long(0x8F7F6F5F, 0x1F2F3F4F); // 0x1F2F3F4F8F7F6F5F
console.log(longVal.toString()); // 2247084350023626591


var buf = new Buffer(8);
buf.fill(0);
buf.writeInt32BE(longVal.high, 0); 
buf.writeInt32BE(longVal.low, 4);
console.log(buf); // <Buffer 1f 2f 3f 4f 8f 7f 6f 5f>


buf.fill(0);
buf.writeInt32LE(longVal.high, 0); 
buf.writeInt32LE(longVal.low, 4);
console.log(buf); // <Buffer 4f 3f 2f 1f 5f 6f 7f 8f>


longVal = new Long(0x8F7F6F5F);
console.log(longVal.toString()); // 2407493471


longVal = new Long(0x1F2F3F4F);
console.log(longVal.toString()); // 523190095

