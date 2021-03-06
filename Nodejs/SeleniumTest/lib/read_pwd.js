var readline = require('readline');
var fs = require('fs');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function hidden(query, callback) {
  var stdin = process.openStdin();

  process.stdin.on("data", function(tmpChar) {
    tmpChar = tmpChar + "";
    switch (tmpChar) {
      case "\n":
      case "\r":
      case "\u0004":
        stdin.pause();
        break;
      default:
        process.stdout.write("\033[2K\033[200D" + query + Array(rl.line.length+1).join("*"));
        break;
    }
  });

  rl.question(query, function(value) {
    rl.history = rl.history.slice(1);
    callback(value);
  });
}

hidden("Password:", function(pwd) {
  var tmpPath = process.env.HOME + '/.ssh/.password';

  fs.open(tmpPath, 'r', function(err) {
    if(!err) {
      fs.unlinkSync(tmpPath);
    }

    var pwd4base64 = new Buffer(pwd).toString('base64');
    fs.writeFileSync(tmpPath, pwd4base64);

    fs.chmodSync(tmpPath, 0400);
  });
});

