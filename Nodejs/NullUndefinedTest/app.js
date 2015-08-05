var foo = function(a, b) {
	console.log('b =', b);
	console.log('"typeof b" =', typeof b);
	if(b == null) {
		console.log('"b == null" is TRUE.');
		b = 100;
	}
	return a * b;
};

var ret = foo(5);
console.log('ret =', ret, '\n');
var ret = foo(5, undefined);
console.log('ret =', ret, '\n');
var ret = foo(5, null);
console.log('ret =', ret, '\n');
var ret = foo(5, NaN);
console.log('ret =', ret, '\n');
