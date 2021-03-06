var utils = module.exports;

// print the file name and the line number ~ begin
function getStack(){
	var orig = Error.prepareStackTrace;
	Error.prepareStackTrace = function(_, stack) {
		return stack;
	};
	var err = new Error();
	Error.captureStackTrace(err, arguments.callee);
	var stack = err.stack;
	Error.prepareStackTrace = orig;
	return stack;
}

function getFileName(stack) {
	return stack[1].getFileName();
}

function getLineNumber(stack){
	return stack[1].getLineNumber();
}

utils.myPrint = function() {
  var len = arguments.length;
	if(len <= 0) {
		return;
	}
	var stack = getStack();
	var aimStr = '\'' + getFileName(stack) + '\' @' + getLineNumber(stack) + ' :\n';
	for(var i = 0; i < len; ++i) {
		aimStr += arguments[i] + ' ';
	}
	console.log('\n' + aimStr);
};
// print the file name and the line number ~ end

