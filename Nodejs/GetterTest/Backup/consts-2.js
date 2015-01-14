var consts = {};

Object.defineProperty(consts, 'COMBAT_TIME_DELTA', {
  get: function() {
    return {
      get ToNextFight() { return 30.0; },
      set ToNextFight() { return ThrowError('ToNextFight'); },
      get TimeForPerAct() { return 10.0; },
      get ToConcludedFast() { return 20.0; } 
    };
  },

  set: function() {
    return ThrowError('COMBAT_TIME_DELTA');
  }
});

var ThrowError = function(tmpName) {
  throw 'Error!!! Try to change CONST: ' + tmpName;
};

module.exports = consts;

