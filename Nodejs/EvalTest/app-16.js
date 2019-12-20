
function foo() {
	console.log( `foo: this.a = ${this.a}` );
}

var obj = {
	a: 2
};

var bar = function() {
	foo.call( obj );
};

bar(); // 2

setTimeout( bar, 100 ); // 2


// 硬绑定的 bar 不可能再修改它的 this
var objX = {
	a: 202
};

bar.call( objX ); // 2

