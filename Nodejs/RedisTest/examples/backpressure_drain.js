var redis = require("redis"),
    client = redis.createClient(null, null, {
        command_queue_high_water: 5,
        command_queue_low_water: 1
    }),
    remaining_ops = 100, paused = false;

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  function op() {
      if (remaining_ops <= 0) {
          console.error("Finished.");
          process.exit(0);
      }

      remaining_ops--;
      if (client.hset("test_hash", "val_" + remaining_ops, remaining_ops) === false) {
          console.log("Pausing at " + remaining_ops);
          paused = true;
      } else {
          process.nextTick(op);
      }
  }

  client.on("drain", function () {
      if (paused) {
          console.log("Resuming at " + remaining_ops);
          paused = false;
          process.nextTick(op);
      } else {
          console.log("Got drain while not paused at " + remaining_ops);
      }
  });

  op();
});

