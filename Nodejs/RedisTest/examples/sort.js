var redis = require("redis"),
    client = redis.createClient();

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.sadd("mylist", 10);
  client.sadd("mylist", 20);
  client.sadd("mylist", 30);

  client.set("weight_10", 90);
  client.set("weight_20", 500);
  client.set("weight_30", 1);

  client.set("object_10", "foo");
  client.set("object_20", "bar");
  client.set("object_30", "qux");

  // client.sort("mylist", "by", "weight_*", "get", "object_*", redis.print);
  client.sort("mylist", "by", "weight_*", "get", "object_*", "get", "#",  redis.print);
  // Prints ~ Reply: qux,foo,bar

  client.quit();
});

