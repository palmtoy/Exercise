class Example {
	constructor() {
		const proto = Object.getPrototypeOf(this);
		console.log(Object.getOwnPropertyNames(proto));
	}
	first() {}
	second() {}
	static third() {}
}

new Example(); // ['constructor', 'first', 'second']

/*------------------------------------------------------------*/

class Base {}

class Good extends Base {}

class AlsoGood extends Base {
  constructor() {
    return {a: 5};
  }
}

class StillGood extends AlsoGood {
  constructor() {
		super();
	}
}

class Bad extends Base {
  constructor() {
		super(); /* ReferenceError */
	}
}

new Good();
new AlsoGood();
const sgObj = new StillGood();
console.log('sgObj = %o', sgObj);

new Bad(); // ReferenceError

/*------------------------------------------------------------*/

function bar(isPrint = false) {
	const tmpObj = this;
	const tmpStr = Object.prototype.toString.call(this);
  console.log('isPrint = %o', isPrint);
	if (isPrint) {
  	// console.log('tmpObj = %o', tmpObj);
  	console.log('tmpStr = %s', tmpStr);
	}
}

bar.call(7);     // [object Number]
bar.call('foo'); // [object String]
bar.call(undefined, true); // [object global]

/*------------------------------------------------------------*/

function f(){
  return this.a;
}

var g = f.bind({a: "azerty"});
console.log(g()); // azerty

var h = g.bind({a: 'yoo'}); // bind只生效一次！
console.log(h()); // azerty

var t = f.bind({a: 'wow'});
console.log(t()); // wow

var o = {a: 37, f: f, g: g, h: h};
console.log(o.a, o.f(), o.g(), o.h()); // 37, 37, azerty, azerty

/*------------------------------------------------------------*/

