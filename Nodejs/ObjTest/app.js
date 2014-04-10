var o = {'a': {'A': 'Mac'}, 'b': 'Win'};

var v1 = o.a;

var v2 = v1;

v1 = null;
o.a = null;

console.log('v1 = ', v1);
console.log('v2 = ', v2);
console.log('o = ', o);
