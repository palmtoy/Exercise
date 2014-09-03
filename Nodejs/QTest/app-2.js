var FS = require('fs');
var Q = require('q');

Q.nfcall(FS.readFile, "foo.txt", "utf-8").done(function (text) {
  console.log('text = ', text);
});

