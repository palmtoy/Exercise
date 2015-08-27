var fs = require('fs');

fs.writeFile('reset_lb_flag.json', '{\n\n}', function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});

