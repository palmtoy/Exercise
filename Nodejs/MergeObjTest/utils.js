var utils = module.exports;


// merge two obj recursively
utils.deepExtend = function(desObj, srcObj) {
  var self = this;

  var doExtend = function(k) {
    // Property in destination object set; update its value.
    if(typeof srcObj[k] === "object" && srcObj[k] !== null) {
      desObj[k] = self.deepExtend(desObj[k], srcObj[k]);
    } else {
      desObj[k] = srcObj[k];
    }
  };

  if(typeof srcObj !== "object" || srcObj === null) {
    return desObj;
  }

  if(srcObj instanceof Array) {
    desObj = desObj || [];
    if(desObj instanceof Array) {
      for(var i = 0; i < srcObj.length; i++) {
        doExtend(i);
      }
    }
  } else {
    desObj = desObj || {};
    if(desObj instanceof Object) {
      for (var p in srcObj) {
        if (srcObj.hasOwnProperty(p)) {
          doExtend(p);
        }
      }
    }
  }

  return desObj;
};

