var redis = require("redis"),
    client = redis.createClient();

redis.debug_mode = true;

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.eval("return 100.5", 0, function (err, res) {
      console.dir(err);
      console.dir(res);
  });

  client.eval([ "return 100.5", 0 ], function (err, res) {
      console.dir(err);
      console.dir(res);
  });

  setTimeout(function() {
    client.quit();
  }, 500);

});

