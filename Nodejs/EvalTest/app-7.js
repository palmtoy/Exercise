
function foo() {
	console.log( `a = ${a}` ); // 2. 原因: JavaScript 并不具有动态作用域。它只有词法作用域，简单明了。
}

function bar() {
	var a = 3;
	foo();
}

var a = 2;

bar();

///////////////////////////////////////////////////////////////////////////////////////////////////

var obj = {
	count: 0,
	cool: function coolFn() {
		if (this.count < 1) {
			setTimeout( () => { // 箭头函数
				this.count++;
				console.log( "awesome?" );
			}, 1000 );
		}
	}
};

obj.cool(); // 很酷吧 ?

