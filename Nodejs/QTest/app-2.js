// readFileUsingPromises.js
var fs = require('fs'),
    q = require('q');

var promise = q.nfcall(fs.readFile, "file.txt", "utf-8");

console.log('typeof promise = ', typeof promise);
console.log('promise = ', JSON.stringify(promise), '\n');


promise.then(function(data) {      
  console.log('File has been read:', data);
})
.fail(function(err) {
  console.error('Error received:', err);
})
.done();


