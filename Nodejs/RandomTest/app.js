var ASSASSIN = 1
  , QUEEN = 9;

var getDiscardRoleIdList = function() {
  var retList = [];
  var rnd = Math.floor(Math.random() * QUEEN + 1);
  for(var i = ASSASSIN; i <= QUEEN; i++) {
    if(i !== rnd) {
      retList.push(i);
    }
  }

  rnd = Math.floor(Math.random() * retList.length);
  retList.splice(rnd, 1);

  return retList;
};

var tmpList = getDiscardRoleIdList();
console.log('tmpList = ', tmpList);
