var i, t = new Date, o;
// for(i = 0; i < 1E4; i++) o = {}, o["n"+i] = i;
for(i = 0; i < 1E4; i++) o = Object.create(Object.prototype), o["n"+i] = i;
console.log(new Date - t);

