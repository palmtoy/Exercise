var foo = function(a, b) {
	console.log('"typeof b" =', typeof b);
	console.log('b =', b);
	if(b == null) {
		console.log('"b == null" is TRUE.');
		b = 100;
	}
	return a * b;
};

var ret = foo(5);

console.log('\nret =', ret);
