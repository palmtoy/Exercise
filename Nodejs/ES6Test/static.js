class StaticMethodCall {
	constructor() {
		console.log(StaticMethodCall.staticMethod()); 
		// 'Static method has been called.' 

		console.log(this.constructor.staticMethod()); 
		// 'Static method has been called.' 
	}

	static staticMethod() {
		return 'Static method has been called.\n';
	}
}

new StaticMethodCall();
/////////////////////////////////////////////////////////

class StaticMethodCall2 {
	static staticMethod() {
		return 'Static method has been called';
	}
	static anotherStaticMethod() {
		return this.staticMethod() + ' from another static method.\n';
	}
}
console.log(StaticMethodCall2.staticMethod());
// 'Static method has been called'

console.log(StaticMethodCall2.anotherStaticMethod());
// 'Static method has been called from another static method'
/////////////////////////////////////////////////////////

class Triple {
	static triple(n) {
		if (n === undefined) {
			n = 1;
		}
		return n * 3;
	}
}

class BiggerTriple extends Triple {
	static triple(n) {
		return super.triple(n) * super.triple(n);
	}
}

console.log(Triple.triple());        // 3
console.log(Triple.triple(6));       // 18

console.log(BiggerTriple.triple(3));
// 81 (not affected by parent's instantiation)

var tp = new Triple();
// console.log(tp.triple());
// !!TypeError: tp.triple is not a function

