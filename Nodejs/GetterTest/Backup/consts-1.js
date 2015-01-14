module.exports = {
  get COMBAT_TIME_DELTA() {
    get ToNextFight() { return 30.0; },
    set ToNextFight() { ThrowError() },
    get TimeForPerAct() { return 10.0; },
    get ToConcludedFast() { return 20.0; } 
  }
};

var ThrowError = function() {
  throw 'Try to change CONST!';
}


var o = {};
o.__defineGetter__('gimmeFive', function() { return 5; });

// Standard-compliant ways: Using the get operator
var o = { get gimmeFive() { return 5; } };

// Using Object.defineProperty
var o = {};
Object.defineProperty(o, 'gimmeFive', {
  get: function() {
    return 5;
  }
});

