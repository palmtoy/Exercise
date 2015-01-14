var o = {};
o.__defineGetter__('gimmeFive', function() { return 5; });
console.log('__defineGetter__: ', o.gimmeFive); // 5


// Standard-compliant ways

// Using the get operator
var o = { get gimmeFive() { return 5; } };
console.log('             get: ', o.gimmeFive); // 5

// Using Object.defineProperty
var o = {};
Object.defineProperty(o, 'gimmeFive', {
  get: function() {
    return 5;
  }
});
console.log('  defineProperty: ', o.gimmeFive); // 5

