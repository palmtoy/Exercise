var fs = require('fs');
var util = require('util');

fs.exists('./message.txt', function (exists) {
  util.debug(exists ? "it's there" : "no message!");
});
