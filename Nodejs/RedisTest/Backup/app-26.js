var redis = require("redis"),
client = redis.createClient();

var msgPrefix = 'push_msg:';
var msgIdx = 'msg_index';

var uid = 1000300;

var tmpMsg = JSON.parse('{"comp":"EventManager","msg":"initInfo","load":{"combat":{"rage":{"max":100,"current":0}}}}');
tmpMsg.timeStamp = new Date().toLocaleString();
console.log('tmpMsg = ', JSON.stringify(tmpMsg), '\n');

// post data to database 1 rather than db 0
client.select(1, function(err, rep) {
  if(err) {
    return console.log('err = ', err);
  }

  client.incr(msgPrefix+uid + ':' + msgIdx, function(err, rep) {
    if(err) {
      console.log("svr error: incr~ err, uid =", err, uid); 
      return client.quit();
    }
    console.log("incr~ rep =", rep); 

    var tmpStr = JSON.stringify(tmpMsg);
    client.set(msgPrefix+uid + ':' + rep, tmpStr, function(err, rep) {
      if(err) {
        console.log("svr error: hset~ err, rep =", err, rep); 
        return client.quit();
      }
      // client.end();
      client.quit();
    });
  });

});


/*

method: POST
route : /fetchpushmsg

app.post('/', function (req, res, next) {
  var uid = req.session.uid;
  var msgIdx = req.param('msgIndex');

  var result = {};
  return res.writeJson(err, result);
});

*/

