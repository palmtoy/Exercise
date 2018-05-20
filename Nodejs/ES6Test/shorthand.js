"use strict";

function MyModule () {
	function foo () {
		return 'foo';
	}

	function bar () {
		return 'bar';
	}

	// Write this:
	const publicAPI = { foo, bar }

	/* Not this:
	const publicAPI =  {
		foo : foo,
		bar : bar
  }
  */ 

	return publicAPI;
};

const m = new MyModule();
console.log(m.foo(), ':', m.bar());

////////////////////////////////////////////////////////////

const myObj = {
	// Set property name equal to return value of fb function
	[fb()] () {
		return 'foobar';
	}
};

function fb () {
	return 'fb';
}

console.log(myObj.fb() ); // 'foobar'

