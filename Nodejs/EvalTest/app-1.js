function foo(obj) {
	// 'use strict';
	with (obj) {
		a = 2;
	}
}

var o1 = { a: 3 };

var o2 = { b: 3 };

foo( o1 );
console.log( o1.a ); // 2

foo( o2 );
console.log( o2.a ); // undefined
console.log( a ); // 2——不好，a 被泄漏到全局作用域上了!

