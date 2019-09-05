const stream = require('stream');
const util = require('util');
const http = require('http');

const Transform = stream.Transform;

function ResHandler(options) {
  // allow use without new
  if (!(this instanceof ResHandler)) {
    return new ResHandler(options);
  }

  // init Transform
  Transform.call(this, options);
}
util.inherits(ResHandler, Transform);

ResHandler.prototype._transform = function (chunk, enc, cb) {
  const resChunk = new Date() + ' ~ HelloWorld ~ ' + chunk.toString().toUpperCase();
  this.push(resChunk);
  cb();
};


const port = 8080;

http.createServer((request, response) => {

	request.on('error', err => {
		console.error(err);
		response.statusCode = 400;
		response.end(response.statusCode.toString());
	});

	if (request.method === 'POST' && request.url === '/echo') {
		const resHandler = new ResHandler();
		request.pipe(resHandler).pipe(response);
	} else {
		response.statusCode = 404;
		response.end(response.statusCode.toString());
	}

}).listen(port);

console.info(`HTTP is running on port ${port} ...`);


/*

curl -X POST -d "useId=5cdx87&data={name:palmtoy}" http://127.0.0.1:8080/echo

*/

