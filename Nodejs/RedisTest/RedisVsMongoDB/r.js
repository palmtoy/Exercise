var redis = require("redis")
  , client = redis.createClient()
  , perfixStr = 'performance:'
  , dataStr = require("./data.json");

var numberOfElements = parseInt(process.argv[2]) || 1;

dataStr = JSON.stringify(dataStr);
var timeStr = Date();

redisWrite();

function redisWrite () {
  console.time('TimeCost-RedisWrite');
  for (var i = 0; i < numberOfElements; i++) {
    client.set(perfixStr + i, i + " ~ " + timeStr + " ~ " + dataStr, function(err, data){
      if (--i === 0) {
        console.timeEnd('TimeCost-RedisWrite');
        redisRead();
      }
    });
  };
}

function redisRead(){
  client = redis.createClient();
  console.time('TimeCost-RedisRead');
  for (var i = 0; i < numberOfElements; i++) {
    client.get(perfixStr + i, function (err, reply) {
      if (--i === 0) {
        console.timeEnd('TimeCost-RedisRead');
        process.exit();
      }
    });
  }
}

