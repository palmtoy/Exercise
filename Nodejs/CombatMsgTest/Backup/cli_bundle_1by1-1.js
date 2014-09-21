var events = require('events');
var request = require('request');
var evtEmitter = new events.EventEmitter();

var n = 0;
var cnt = parseInt(process.argv[2]) || 1;
var start = new Date().getTime();

function calcCnt() {
  ++n;
  if(n === cnt) {
    console.log('n = ', n);
    var end = new Date().getTime();

    console.log('\n' + 'start = ', start);
    console.log('end   = ', end, '\n');
    console.error((end - start) / 1000 + " sec \n");

    process.exit(0);
  }
}


var evtArr = [
  {"attackerTeam":0,"attackerId":1,"targetTeam":1,"targetList":[1],"challengerHP":[120,120,120],"defenderHP":[120,0,120]},

  {"attackerTeam":1,"attackerId":2,"targetTeam":0,"targetList":[1],"challengerHP":[120,0,120],"defenderHP":[120,0,120]},

  {"attackerTeam":0,"attackerId":0,"targetTeam":1,"targetList":[0],"challengerHP":[120,0,120],"defenderHP":[0,0,120]},

  {"attackerTeam":1,"attackerId":2,"targetTeam":0,"targetList":[0],"challengerHP":[0,0,120],"defenderHP":[0,0,120]},

  {"attackerTeam":0,"attackerId":2,"targetTeam":1,"targetList":[2],"challengerHP":[0,0,120],"defenderHP":[0,0,0]}
];
var strEvtArr = JSON.stringify(evtArr);


function bar(tmpStr) {
  var port = 3000;
  var tmpBody = 'msg=' + tmpStr;
  request.post({
    headers: {'Content-type': 'application/x-www-form-urlencoded', charset: 'utf-8'},
    url: 'http://localhost:' + port + '/combatmsg',
    body: tmpBody
  }, function(error, response, body){
    if (!error && response.statusCode === 200) {
      calcCnt();
      evtEmitter.emit('callBar', strEvtArr);
    }
  });
}

evtEmitter.on('callBar', function(tmpStr) {
		bar(tmpStr);
	}
);


evtEmitter.emit('callBar', strEvtArr);


