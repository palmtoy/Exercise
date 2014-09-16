var getStackTrace = function() {
  var obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack;
};

var tr = getStackTrace();
console.log('tr = ', tr, '\n')
console.log('typeof tr = ', typeof tr)

