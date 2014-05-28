var i, t = new Date, o;
// var c = function() {};
// for(i = 0; i < 1E4; i++) o = Object.create({}), o["n"+i] = i;
// for(i = 0; i < 1E4; i++) o = Object.create(c.prototype), o["n"+i] = i;
for(i = 0; i < 1E4; i++) {
  // var c = function() {};
  // o = Object.create(c.prototype), o["n"+i] = i;
  var c = {};
  o = Object.create(c), o["n"+i] = i;
}
// for(i = 0; i < 1E4; i++) o = Object.create(null), o["n"+i] = i;
console.log(new Date - t);
