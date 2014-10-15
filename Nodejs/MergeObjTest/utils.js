var utils = module.exports;
var underscore = require('underscore');


// merge two obj recursively
utils.deepExtend = function(desObj, srcObj) {
  var self = this;

  var doExtend = function(k) {
    // Property in destination object set; update its value.
    if(underscore.isObject(srcObj[k])) {
      desObj[k] = self.deepExtend(desObj[k], srcObj[k]);
    } else {
      desObj[k] = srcObj[k];
    }
  };

  if(!underscore.isObject(srcObj)) {
    return srcObj;
  }

  if(underscore.isArray(srcObj)) {
    desObj = desObj || [];
    if(underscore.isArray(desObj)) {
      for(var i = 0; i < srcObj.length; i++) {
        doExtend(i);
      }
    }
  } else {
    desObj = desObj || {};
    if(underscore.isObject(desObj)) {
      for (var p in srcObj) {
        if (srcObj.hasOwnProperty(p)) {
          doExtend(p);
        }
      }
    }
  }

  return desObj;
};

