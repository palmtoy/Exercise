var FS = require('fs');
var Q = require('q');

function getFromFoo() {
  return Q.nfcall(FS.readFile, "foo.txt", "utf-8");
}

function getFromBar() {
  return Q.nfcall(FS.readFile, "bar.txt", "utf-8");
}

Q.all([getFromFoo(), getFromBar()]).spread(function (fooText, barText) {
  console.log('fooText = ', fooText);
  console.log('barText = ', barText);
}).done();


