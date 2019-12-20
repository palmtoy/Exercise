function foo(str, a) {
	eval( str ); // 欺骗!
	console.log( a, b );
}

var b = 2;

// foo( 'var bb = 3;', 1 ); // 1, 3
foo( 'var b = 3;', 1 ); // 1, 3

////////////////////////////////////////////////////////////

function bar(str) {
	'use strict';
	eval( str );
	console.log( a ); // ReferenceError: a is not defined
}

bar( 'var a = 2; console.log(`a(${a}) in the eval.`);' );

