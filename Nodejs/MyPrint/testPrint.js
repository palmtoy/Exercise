// print the file name and the line number
function getStack(){
	var orig = Error.prepareStackTrace;
	Error.prepareStackTrace = function(_, stack){ return stack; };
	var err = new Error();
	Error.captureStackTrace(err, arguments.callee);
	var stack = err.stack;
	Error.prepareStackTrace = orig;
	return stack;
}

function getFileName(stack) {
	return stack[2].getFileName();
}

function getLineNumber(stack){
	return stack[2].getLineNumber();
}

var stack = getStack();
var aimStr = '\'' + getFileName(stack) + '\' @' + getLineNumber(stack) + ' :\n';
console.log('\n' + aimStr);

