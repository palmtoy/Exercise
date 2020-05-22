function Animal() {
	this.name = 'Animal';
}

Animal.prototype.sayName = function(){
	console.log(this.name);
};

const animalOb = new Animal();
animalOb.sayName();

function Person() {}

Person.prototype = Animal.prototype; // 人继承自动物
Person.prototype.name = 'Person'; // 更新构造函数为人

const personObj = new Person();
personObj.sayName();

