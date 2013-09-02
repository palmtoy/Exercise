var fs = require('fs');

fs.readFile('./world.txt', function (err, data) {
  if (err) throw err;
  console.log(data);
  console.log(data.toString());
  console.log(typeof JSON.stringify(data));
});
