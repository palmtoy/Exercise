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


function MergeRecursive(tObj, sObj) {
  for (var p in sObj) {
    if (sObj.hasOwnProperty(p)) {
      try {
        // Property in destination object set; update its value.
        if (sObj[p] && sObj[p].constructor === Object) {
          tObj[p] = MergeRecursive(tObj[p], sObj[p]);
        } else {
          tObj[p] = sObj[p];
        }
      } catch(e) {
        // Property in destination object not set; create it and set its value.
        tObj[p] = sObj[p];
      }
    }
  }

  return tObj;
}

targetObj = MergeRecursive(targetObj, srcObj);

console.log('targetObj = ', JSON.stringify(targetObj));

