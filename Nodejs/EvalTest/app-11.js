
/*
	function foo() {
		var a = 2;
		this.bar(); // TypeError: this.bar is not a function
	}

	function bar() {
		console.log( this.a );
	}

	foo(); // ReferenceError: a is not defined
*/


function foo() {
	console.log( 'foo: ' + Object.keys(this) );
	console.log();
	console.log( `this.a = ${this.a}` );
}

var a = 2;
console.log( 'Global: ' +  Object.keys(this) + '\n' );

foo(); // 2

