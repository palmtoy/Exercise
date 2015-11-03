'use strict';

function funcHello(name) {
	if(name === 'palmtoy'){
		return 'Long time no see, ' + name + '.';
	}
	return 'Hello ' + name + '.';
}

console.log(funcHello('will'));
console.log(funcHello('palmtoy'));

