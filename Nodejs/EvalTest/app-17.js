
function foo(something) {
	console.log('foo:', this.a, something );
	return this.a + something;
}

var obj = {
	a: 2
};

var bar = function() {
	return foo.apply( obj, arguments );
};

var b = bar( 3 ); // 2 3

console.log( `b = ${b}` ); // 5

