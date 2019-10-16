function foo() {

	var a = 2;

	function bar() {
		console.log(`I am in a closure, a = ${a}.`);
	}

	return bar;

}

var baz = foo();
baz(); // 2 —— 朋友，这就是闭包的效果。


////////////////////////////////////////////////


var fn;

function fooX() {

	var a = 200;

	function baz() {
		console.log(`I am in a closure too, a = ${a}.`);
	}

	fn = baz; // 将 baz 分配给全局变量
}

function barX() {
	fn(); // 妈妈快看呀，这就是闭包!
}

fooX();

barX(); // 200


////////////////////////////////////////////////

console.log(new Date().getTime());

function wait(message) {

	setTimeout( function timer() {
		console.log( new Date().getTime() + ' => ' + message );
	}, 1000 );

}

wait( 'Hello, closure! (After 1s.)\n' );


////////////////////////////////////////////////


for (var i = 1; i <= 5; i++) {
	setTimeout( function timerX() {
		console.log( new Date().getTime() + ' => ' + i );
	}, i * 2000 );
}

setTimeout( function timerX() {
	console.log();
	for (var k = 1; k <= 5; k++) {
		(function(j) {
			setTimeout( function timer() {
				console.log( new Date().getTime() + ' => ' + j );
			}, j * 1000 );
		})( k );
	}
}, i * 2000 );

