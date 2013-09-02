var fs = require('fs');

fs.appendFile('message.txt', 'data to append\n', function (err) {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
