var redis = require("redis"),
client = redis.createClient({detect_buffers: false});

client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.set("foo", "Hello World");

  /*
     Calling unref() will allow this program to exit immediately after the get command finishes. Otherwise the client would hang as long as the client-server connection is alive.
     */

  client.get("foo", function (err, value){
    if (err) {
      console.log(err)
      throw(err);
      return;
    }
    console.log(value)
    client.unref()
  })
});

