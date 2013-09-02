var fs = require('fs');

fs.writeFile('message.txt', 'Hello Node\n', function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});
