setTimeout( function timeoutHandler() { // <-- 快看，我有名字了!
	console.log( "I waited 1 second!" );
}, 1000 );

/////////////////////////////////////////////////////////////////

undefined = true; // 给其他代码挖了一个大坑!绝对不要这样做!
console.log( '@@@ undefined =', undefined );

(function IIFE( undefined ) {
	var a;
	if (a === undefined) {
		console.log( "Undefined is safe here!" );
	} else {
		console.log( "Undefined is NOT safe here!" );
	}
})();


console.log( 'aa(1) =', aa );
aa = 2;
var aa;
console.log( 'aa(2) =', aa );


/*
console.log( bar ); // ReferenceError!
let bar = 2;
*/

