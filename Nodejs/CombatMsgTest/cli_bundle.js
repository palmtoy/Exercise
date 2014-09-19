var request = require('request');

var port = 3000;

var evtArr = [
  {"attackerTeam":0,"attackerId":1,"targetTeam":1,"targetList":[1],"challengerHP":[120,120,120],"defenderHP":[120,0,120]},

  {"attackerTeam":1,"attackerId":2,"targetTeam":0,"targetList":[1],"challengerHP":[120,0,120],"defenderHP":[120,0,120]},

  {"attackerTeam":0,"attackerId":0,"targetTeam":1,"targetList":[0],"challengerHP":[120,0,120],"defenderHP":[0,0,120]},

  {"attackerTeam":1,"attackerId":2,"targetTeam":0,"targetList":[0],"challengerHP":[0,0,120],"defenderHP":[0,0,120]},

  {"attackerTeam":0,"attackerId":2,"targetTeam":1,"targetList":[2],"challengerHP":[0,0,120],"defenderHP":[0,0,0]}
];


var cnt = parseInt(process.argv[2]) || 1;
var n = 0;


var start = 0;
var end = 0;
start = new Date().getTime();


for(var i = 0; i < cnt; i++) {
  var tmpBody = 'msg=' + JSON.stringify(evtArr);
  request.post({
    headers: {'Content-type': 'application/x-www-form-urlencoded', charset: 'utf-8'},
    url: 'http://localhost:' + port + '/combatmsg',
    body: tmpBody
  }, function(error, response, body){
    if (!error && response.statusCode == 200) {
      ++n;
      // console.log('%d: %s', n, body);
      if(n === cnt) {
        end = new Date().getTime();

        console.log('\n\n' + 'start = ', start);
        console.log('end   = ', end);
        console.error((end - start) / 1000 + " sec \n\n");

        // process.exit(0);
      }
    }
  });
}

