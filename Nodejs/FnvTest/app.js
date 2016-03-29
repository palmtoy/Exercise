var FNV = require("fnv").FNV

var h = new FNV()

var str = 'foobar';
h.update(Buffer(str))
var c = h.digest("hex") // '31f0b262'
console.log('str, c =', str, c);
console.log();

str = 'helloworld';
h.update(new Buffer(str))
c = h.digest("hex") // 'a55eda9e'
console.log('str, c =', str, c);
c = h.value();
console.log('c =', c);
console.log();


str = 'hibaby';
h.update(new Buffer(str));
var v = h.value(); // 582056603
console.log('str, typeof v, v =', str, typeof v, v);

