/*
	node app.js
	 or
	node app.js --no-color
*/ 

var colors = require('colors/safe');
 
console.log(colors.green('hello')); // outputs green text 
console.log(colors.red.underline('i like cake and pies')) // outputs red underlined text 
console.log(colors.inverse('inverse the color')); // inverses the color 
console.log(colors.rainbow('OMG Rainbows! -- Will Lee')); // rainbow 
console.log(colors.trap('Run the trap\n')); // Drops the bass 
 

var name = 'Will';
console.log(colors.green('Hello %s'), name);
console.log(colors.magenta('World %s'), name);
// outputs -> 'Hello Will'
