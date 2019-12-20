(function IIFE( def ) {
	def( global );
})(function def( globalX ) {
	var a = 3;
	console.log( a ); // 3
	console.log( globalX.process.pid );
	// console.log( globalX );
	console.log();
});

/////////////////////////////////////////////////////

try {
	undefined(); // 执行一个非法操作来强制制造一个异常
}
catch (err) {
	console.log( err ); // 能够正常执行!
	console.log();
}
console.log( err ); // ReferenceError: err not found

