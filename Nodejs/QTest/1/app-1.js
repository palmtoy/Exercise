// readFileUsingPromises.js
var fs = require('fs'),
    q = require('q');

q.nfcall(fs.readFile, "file.txt", "utf-8")
.then(function(data) {      
  console.log('File has been read:', data);
})
.fail(function(err) {
  console.error('Error received:', err);
})
.done();

