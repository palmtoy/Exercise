var exec = require('child_process').exec;

exec('ls -la',
  function (error, _, _) {
    if (error !== null) {
      console.log('Exec error: ' + error + '!');
    } else {
      console.log('OK ~');
    }
});

