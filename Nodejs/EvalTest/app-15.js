
function foo() {
	console.log( `foo: this.a = ${this.a}` );
}

var obj = {
	a: 2
};

foo.call( obj ); // 2

