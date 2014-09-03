function rnd(seed){
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280.0;
};

function rand(number){
  var today = new Date(); 
  var seed = today.getTime();
  var delta = Math.floor(Math.random() * seed);
  var sign = Math.floor(Math.random() * 2);
  if(sign) {
    seed += delta;
  } else {
    seed -= delta;
  }
  return Math.floor(rnd(seed) * number);
};

var cnt = process.argv[2];

var retArr = [];

for(var i = 0; i < cnt; i++) {
  var v = rand(cnt);
  retArr.push(v);
}

console.log('retArr = ', JSON.stringify(retArr));
