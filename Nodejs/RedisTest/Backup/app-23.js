var redis = require("redis"),
client = redis.createClient(), multi;

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  // start a separate multi command queue
  multi = client.multi([
    ["del", "global_msg_num", redis.print],
    ["set", "global_msg_num", 0],
    ["get", "global_msg_num", redis.print],
    ["incr", "global_msg_num"],
    ["incr", "global_msg_num"]
  ]);

  multi.incr("global_msg_num", redis.print);

  // drains multi queue and runs atomically
  multi.exec(function (err, replies) {
    console.log(replies);
  });

  setTimeout(function() {
    client.end();
  }, 1000);

});

