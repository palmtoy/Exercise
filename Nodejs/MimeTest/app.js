var mime = require('mime');
 
console.log(mime.lookup('/path/to/file.txt'));         // => 'text/plain' 
console.log(mime.lookup('file.txt'));                  // => 'text/plain' 
console.log(mime.lookup('.TXT'));                      // => 'text/plain' 
console.log(mime.lookup('htm'));                       // => 'text/html' 
console.log();

console.log(mime.extension('text/html'));                 // => 'html' 
console.log(mime.extension('application/octet-stream'));  // => 'bin' 
console.log();

console.log(mime.charsets.lookup('text/plain'));        // => 'UTF-8' 
console.log();


mime.define({
	'text/x-some-format': ['x-sf', 'x-sft', 'x-sfml'],
	'application/x-my-type': ['x-mt', 'x-mtt'],
	// etc ... 
});
console.log(mime.lookup('x-sft'));                 // => 'text/x-some-format' 
console.log(mime.extension('text/x-some-format')); // => 'x-sf' 

