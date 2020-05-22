// 工厂: 同样形式的参数返回不同的实例

function Person() { this.name = 'Person-1'; }
function Animal() { this.name = 'Animal-2'; }

function Factory() {}

Factory.prototype.getInstance = function(className) {
	return eval('new ' + className + '()');
}

var factory = new Factory();

var obj1 = factory.getInstance('Person');
var obj2 = factory.getInstance('Animal');

console.log(obj1.name); // Person1
console.log(obj2.name); // Animal2

