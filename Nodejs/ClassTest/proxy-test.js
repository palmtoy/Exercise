// 代理: 新建一个类调用老类的接口, 包一下

function Person() {}
Person.prototype.sayName = function() { console.log('palmtoy'); }
Person.prototype.sayAge = function() { console.log(30); }

function PersonProxy() {
	this.person = new Person();
	const self = this;
	this.callMethod = function(functionName) {
		console.log('before proxy:', functionName);
		self.person[functionName](); // 代理
		console.log('after proxy:', functionName);
	}
}

const pp = new PersonProxy();
pp.callMethod('sayName'); // 代理调用Person的方法sayName()
console.log();
pp.callMethod('sayAge'); // 代理调用Person的方法sayAge()

