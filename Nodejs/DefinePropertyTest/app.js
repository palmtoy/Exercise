var o = {};

Object.defineProperty(o, 'a', {
	value: 1,
	writable: true,
	configurable: true,
	enumerable: true
});

Object.defineProperty(o, 'b', {
	value: 2,
	writable: true,
	configurable: true,
	enumerable: true
});

console.log('I: o = %j', o);


o.a = 11;
o.b = 22;

console.log('II: o = %j', o);

/////////////////////////////////

// On the other hand,
Object.defineProperty(o, 'x', { value: 666 });
// is equivalent to:
Object.defineProperty(o, 'y', {
	value: 999,
	writable: false,
	configurable: false,
	enumerable: false
});

console.log('III(a,b without x,y): o = %j', o);
console.log('III(a,b without x,y): o =', JSON.stringify(o));
console.log('IV(just x666): o.x =', o.x);
console.log('IV(just y999): o.y =', o.y);

o.x = 'XXX';
o.y = 'YYY';

console.log('V(a,b without x,y): o = %j', o);
console.log('V(a,b without x,y): o =', JSON.stringify(o));
console.log('VI(just x666): o.x =', o.x);
console.log('VI(just y999): o.y =', o.y);

