var consts = {};

Object.defineProperty(consts, 'HERO_STATS', {
  get: function() {
    return ['STR', 'Armor', 'INT', 'STA', 'Charisma'];
  },

  set: function() {
    return ThrowError('HERO_STATS');
  }
});


var ThrowError = function(tmpName) {
  throw 'Dangerous! Try to change CONST: ' + tmpName;
};

module.exports = consts;

