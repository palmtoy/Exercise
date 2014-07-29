var fork = require('child_process').fork;
var spawn = require('child_process').spawn;

for (var i = 0; i < 3; i++) {
  fork("watch.js");
}

