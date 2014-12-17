var readline = require('readline');
var fs = require('fs');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function hidden(query, callback) {
  var stdin = process.openStdin();

  process.stdin.on("data", function(char) {
    char = char + "";
    switch (char) {
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

hidden("pwd: ", function(pwd) {
  // console.log("Your pwd: " + pwd);
  var pwd4base64 = new Buffer(pwd).toString('base64');
  fs.writeFileSync('./pwd.txt', pwd4base64);
});

