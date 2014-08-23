var targetObj = {

  inventory: {
    '11476': 
      { _id: '53f6f80d29eefac3f0938649',
        _ts: 1408694285,
        bound_state: false,
        cell: 1,
        economy_id: 'W_WPN_EP_20',
        inventory_id: 11476,
        location: 'bag',
        num: 1,
        subtype: 'Weapon',
        type: 'equipment',
        uid: 1000661 } 
  },

  equipment: {
    '11477': 
      { uid: 1000661,
        economy_id: 'M_WPN_EP_40',
        bound_state: false,
        type: 'equipment',
        subtype: 'Weapon',
        inventory_id: 11477,
        num: 1,
        location: 'equipment',
        cell: 'Weapon',
        _ts: 1408694285,
        _id: '53f6f80d29eefac3f093864d' }
  } 

};


var srcObj = { inventory: { '11477': null }, equipment: { '11476': null } };


function MergeRecursive(tObj, sObj) {
  for (var p in sObj) {
    try {
      // Property in destination object set; update its value.
      if ( sObj[p].constructor === Object ) {
        tObj[p] = MergeRecursive(tObj[p], sObj[p]);
      } else {
        tObj[p] = sObj[p];
      }
    } catch(e) {
      // Property in destination object not set; create it and set its value.
      tObj[p] = sObj[p];
    }
  }

  return tObj;
}

targetObj = MergeRecursive(targetObj, srcObj);

console.log('targetObj = ', JSON.stringify(targetObj));

