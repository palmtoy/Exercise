var us = require('underscore');

var srcObj = {sock: {economyId: 1001}};
var targetObj = {inventory: [
        {"1001": {
          inventoryId: 1001, 
          uid: 20002,
          economyId: "M_WPN_LG_40"
        }}, 

        {"1002": {
          inventoryId: 1002, 
          uid: 20002,
          economyId: "M_WPN_LG_50"
        }} 
      ]
    }; 

for(var i in targetObj) {
  var l = targetObj[i];
  l.forEach(function(o) {
    for(var j in o) {
      us.extend(o[j], srcObj);
    }
  });
}

console.log('targetObj = ', JSON.stringify(targetObj));

