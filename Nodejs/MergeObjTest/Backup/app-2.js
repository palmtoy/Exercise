var targetObj = {

  inventory: {
    '11476': 
      { economy_id: 'W_WPN_EP_20',
        inventory_id: 11476
      } 
  },

  equipment: {
    '11477': 
      { 
        economy_id: 'M_WPN_EP_40',
        inventory_id: 11477
      }
  } 

};


var srcObj = { inventory: { '11477': null }, equipment: { '11476': null } };

var MergeRecursive = function(destination, source) {
  for (var property in source) {
    if (source.hasOwnProperty(property)) {
      if (source[property] && source[property].constructor && source[property].constructor === Object) {
        destination[property] = destination[property] || {};
        arguments.callee(destination[property], source[property]);
      } else {
        destination[property] = source[property];
      }
    }
  }
  return destination;
};


targetObj = MergeRecursive(targetObj, srcObj);
console.log('targetObj = ', JSON.stringify(targetObj));

