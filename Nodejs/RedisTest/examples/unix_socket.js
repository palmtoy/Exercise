/*

start redis server with config file:

redis-server ./conf/redis.conf --daemonize yes --logfile ./conf/redis.log

*/

var redis = require("redis"),
    client = redis.createClient("/tmp/redis.sock");

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.on("connect", function () {
    console.log("Got Unix socket connection.")
  });

  client.on("error", function (err) {
    console.log(err.message);
  });

  client.set("space_chars", "space_value");

  setInterval(function () {
    client.get("space_chars", redis.print);
  }, 500);

  function done() {
    client.info(function (err, reply) {
      console.log('\nAAA ~ redis info:', reply.toString());
      client.quit();
      process.exit();
    });
  }

  setTimeout(function () {
    done();
  }, 1800);

});

