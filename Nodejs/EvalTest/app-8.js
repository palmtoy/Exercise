function identify() {
	var upperStr = this.name.toUpperCase();
	console.log( `identify: ${upperStr}` );
	return upperStr;
}

function speak() {
	var greeting = "Hello, I'm " + identify.call( this ) + '.';
	console.log( `speak: ${greeting}` );
}

var me = {
	name: "Kyle"
};

var you = {
	name: "Reader"
};

identify.call( me ); // KYLE
identify.call( you ); // READER

console.log();
speak.call( me ); // Hello, 我是 KYLE
console.log();
speak.call( you ); // Hello, 我是 READER

