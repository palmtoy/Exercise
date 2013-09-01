var async = require('async')
  , request = require('request')
  , util = require('util')
  , moment = require('moment');

async.parallel([
    function(callback) {
      request("http://google.jp", function(err, response, body) {
        if(err) { console.log(err); callback(true); return; }
        console.log("\nfunction: 1")
        // console.log("response = ", util.inspect(response));
        console.log("google.jp ~ body = ", util.inspect(body));
        callback(false);
      });
    },

    function(callback) {
      request("http://google.com", function(err, response, body) {
        if(err) { console.log(err); callback(true); return; }
        console.log("\nfunction: 2")
        console.log("google.com ~ body = ", util.inspect(body));
        callback(false);
      });
    },

    function() {
      var now = moment();
      console.log('\nnow = ', now);
      // process.stdout.write(moment().format('ss.SSS')+'> ');
      process.stdout.write(now.format('ss.SSS')+'> ');
    }
]);



