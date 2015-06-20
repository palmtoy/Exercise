var colors = require('colors/safe');

// set single property 
var error = colors.red;
error('this is red');

// set theme 
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

// outputs rainbow text 
console.log(colors.silly("this is rainbow, oh, my god!"));

// outputs red text 
console.log(colors.error("this is an error"));

// outputs yellow text 
console.log(colors.warn("this is a warning"));

