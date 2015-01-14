var consts = {};

Object.defineProperty(consts, 'HERO_STATS', {
  get: function() {
    return {
      get 0() { return 'STR'; },
      set 0() { return ThrowError('0'); },

      get 1() { return 'Armor'; },
      set 1() { return ThrowError('1'); },

      get 2() { return 'INT'; },
      set 2() { return ThrowError('2'); },

      get length() { return 3 },
      set length() { return ThrowError('length'); }
    };
  },

  set: function() {
    return ThrowError('HERO_STATS');
  }
});

var ThrowError = function(tmpName) {
  throw 'Error!!! Try to change CONST: ' + tmpName;
}

module.exports = consts;

