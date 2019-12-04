
/*
	function foo() {
		console.log( `foo: this.a = ${this.a}` );
	}

	var obj = {
		a: 2,
		foo: foo
	};

	var bar = obj.foo; // 函数别名!

	var a = "oops, global"; // a 是全局对象的属性

	bar(); // undefined
*/


function foo() {
	console.log( `foo: this.a = ${this.a}` );
}

function doFoo(fn) {
	// fn 其实引用的是 foo
	fn(); // <-- 调用位置!
}

var obj = {
	a: 2,
	foo: foo
};

var a = "oops, global"; // a 是全局对象的属性

doFoo( obj.foo ); // undefined

