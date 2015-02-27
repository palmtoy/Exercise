var redis = require("redis")
  , client = redis.createClient()
  , perfixStr = 'performance:'
  , dataStr = require("./data.json");

var numberOfElements = parseInt(process.argv[2]) || 1;

dataStr = JSON.stringify(dataStr);

client.del({}, function(err, reply){
  redisWrite();
});

function redisWrite () {
  console.time('redisWrite');
  for (var i = 0; i < numberOfElements; i++) {
    client.set(perfixStr + i, i + " ~ " + dataStr, function(err, data){
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
        process.exit();
      }
    });
  }
}

