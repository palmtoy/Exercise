/*
	function foo() {
		console.log( `foo: this.a = ${this.a}` );
	}

	var obj = {
		a: 2,
		foo: foo
	};

	obj.foo(); // 2

	foo(); // undefined
*/


function foo() {
	console.log( `foo: this.a = ${this.a}` );
}

var obj2 = {
	a: 42,
	foo: foo
};

var obj1 = {
	a: 2,
	obj2: obj2
};

obj1.obj2.foo(); // 42

