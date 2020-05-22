function Animal() {
	this.name = 'Animal';
}

Animal.prototype.sayName = function() {
	console.log(this.name);
};

const animalOb = new Animal();
animalOb.sayName();

function Person() {}

// 复制动物的所有属性到人量边
for(prop in Animal.prototype) {
	Person.prototype[prop] = Animal.prototype[prop];
}

Person.prototype.name = 'Person'; // 更新构造函数为人

const personObj = new Person();
personObj.sayName();

