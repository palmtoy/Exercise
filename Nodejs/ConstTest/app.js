var CONFIG = (function() {
  var private = {
    PROFESSION: {
      KNIGHT: 1,
      ARCHER: 2,
      MAGE: 3
    },

    PRO_MAP: {
      1: 'knight_stats',
      2: 'archer_stats',
      3: 'mage_stats'
    }
  };

  return {
    get: function(name) { return private[name]; }
  };
})();


// if(CONFIG.private.PROFESSION = '5') {
if(CONFIG.PROFESSION === '5') {
  console.log('A ~ CONFIG = ', CONFIG);
}

console.log('B ~ CONFIG = ', CONFIG.get('PROFESSION'));

