/*
Object.defineProperty(global, '__STACK__', {
  get: function(){
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__FILE__', {
		get: function() {
				return __STACK__[1].getFileName();
		}
});

Object.defineProperty(global, '__LINE__', {
  get: function(){
    return __STACK__[1].getLineNumber();
  }
});

console.log("I am running from file " + __FILE__);
console.log("I am running from line " + __LINE__);
*/

function loadVars(){
	var vars = loadVars.arguments;
	for (var i = 0; i < vars.length; i++){
		console.log(vars[i]);
	}
}
loadVars('a', 'b', 'c');


function muiltArgs(){
  var s = '函数本身定义的参数个数为:' + muiltArgs.length + '\n' + '传入的参数个数为:' + arguments.length;
  console.log(s);
  var len = arguments.length;
  s='';
  for(i=0; i<len; i++) {
    s += arguments[i];
    if(i<len-1) s += ' | ';
  }
  console.log(s);
}
muiltArgs('aa', 'bb', 'cc', 12, 25.5);


// print the file name and the line number
function getStack(){
	var orig = Error.prepareStackTrace;
	Error.prepareStackTrace = function(_, stack){ return stack; };
	var err = new Error;
	Error.captureStackTrace(err, arguments.callee);
	var stack = err.stack;
	Error.prepareStackTrace = orig;
	return stack;
}

function getFileName() {
	return __STACK__[2].getFileName();
}

function getLineNumber(){
	return __STACK__[2].getLineNumber();
}

utils.myPrint = function() {
  var len = arguments.length;
	if(len <= 0) {
		return;
	}
	var stack = getStack();
	var aimStr = '\'' + getFileName(stack) + '\' @' + getLineNumber(stack) + ' :\n';
	for(var i = 0; i < len; ++i) {
		aimStr += arguments[i];
	}
	console.log('\n' + aimStr);
};

