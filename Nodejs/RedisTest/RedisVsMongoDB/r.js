var redis = require("redis")
  , client = redis.createClient()
  , perfixStr = 'performance:'
  // , numberOfElements = 50000;
  , numberOfElements = 5;

client.del({}, function(err, reply){
  redisWrite();
});

function redisWrite () {
  console.time('redisWrite');
  for (var i = 0; i < numberOfElements; i++) {
    client.set(perfixStr + i, i + " ~ some fantastic value ", function(err, data){
      if (--i === 0) {
        console.timeEnd('redisWrite');
        redisRead();
      }
    });
  };
}

function redisRead(){
  client = redis.createClient();
  console.time('redisRead');
  for (var i = 0; i < numberOfElements; i++) {
    client.get(perfixStr + i, function (err, reply) {
      if (--i === 0) {
        console.timeEnd('redisRead');
      }
    });
  }
}

