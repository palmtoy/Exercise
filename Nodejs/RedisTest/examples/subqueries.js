// Sending commands in response to other commands.
// This example runs "type" against every key in the database
//
var client = require("redis").createClient();

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.keys("*", function (err, keys) {
    keys.forEach(function (key, pos) {
      client.type(key, function (err, keytype) {
        console.log(key + " is " + keytype);
        if (pos === (keys.length - 1)) {
          client.quit();
        }
      });
    });
  });
});

