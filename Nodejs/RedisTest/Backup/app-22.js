var redis = require("redis"),
client = redis.createClient();

var uidPrefix = 'push_msg_key:uid:';
var msgIdx = 'msg_index';

var uid = 10000300;

var tmpMsg = JSON.parse('{"comp":"EventManager","msg":"initInfo","load":{"combat":{"rage":{"max":100,"current":0}}}}');
tmpMsg.timeStamp = new Date().toLocaleString();
console.log('tmpMsg = ', JSON.stringify(tmpMsg), '\n');

// post data to database 1 rather than db 0
client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.get(uidPrefix+uid + ':' + msgIdx, function(err, rep) {
    if(err) {
      console.log("svr error: hget~ err, uid =", err, uid); 
      return client.quit();
    } else {
      console.log("hget~ rep =", rep); 
      if(!rep) {
        client.set(uidPrefix+uid + ':' + msgIdx, 0, function(err, rep) {
          if(err) {
            console.log("svr error: hset~ err, uid =", err, uid); 
            return client.quit();
          }

          setTimeout(function() {
            client.incr(uidPrefix+uid + ':' + msgIdx, function(err, rep) {
              if(err) {
                console.log("svr error: incr_1~ err, uid =", err, uid); 
                return client.quit();
              }
              console.log("incr_1~ rep =", rep); 

              var tmpStr = JSON.stringify(tmpMsg);
              client.set(uidPrefix+uid + ':' + rep, tmpStr, function(err, rep) {
                if(err) {
                  console.log("svr error: hset~ err, rep =", err, rep); 
                  return client.quit();
                }
                client.end();
              });
            });
          }, 500);
        });
      }
    }
  });
});

