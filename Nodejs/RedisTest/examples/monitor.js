var redis  = require("redis"),
    client = redis.createClient(),
    util = require("util");

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.monitor(function (err, res) {
      console.log("Entering monitoring mode ...");
  });

  client.on("monitor", function (time, args) {
      console.log(time + ": " + util.inspect(args));
  });

});

