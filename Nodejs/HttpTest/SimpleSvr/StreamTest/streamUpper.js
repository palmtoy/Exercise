const stream = require('stream');
const util = require('util');

const Transform = stream.Transform;

function Upper(options) {
  // allow use without new
  if (!(this instanceof Upper)) {
    return new Upper(options);
  }

  // init Transform
  Transform.call(this, options);
}
util.inherits(Upper, Transform);

Upper.prototype._transform = function (chunk, enc, cb) {
  const upperChunk = chunk.toString().toUpperCase();
  this.push(upperChunk);
	/*
  const lowerChunk = chunk.toString().toLowerCase();
  this.push(lowerChunk);
	*/
  cb();
};


// try it out
const upper = new Upper();
upper.pipe(process.stdout);  // output to stdout
upper.write('Hello World!\n'); // input line 1
upper.write('Another line.');  // input line 2
upper.end();  // finish

