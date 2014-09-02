function getRandomBytes (howMany) {
  var fs= require('fs');
  var bytes= new Buffer(howMany);
  var fd= fs.openSync('/dev/random', 'r');
  fs.readSync(fd, bytes, 0, howMany, null);
  fs.closeSync(fd)
  //return bytes;
  return bytes.toString();
}

console.log(getRandomBytes(48));

