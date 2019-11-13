
function foo() {
	console.log( `a = ${a}` ); // 2. 原因: JavaScript 并不具有动态作用域。它只有词法作用域，简单明了。
}

function bar() {
	var a = 3;
	foo();
}

var a = 2;

bar();

