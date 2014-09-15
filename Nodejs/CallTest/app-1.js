function Person(name, age)
{
  /*
  this.name = name;
  this.age = age;
  */

  console.log('arguments = ', arguments);
  console.log('arguments.length = ', arguments.length);

  console.log('AAA ~ ', Array.prototype.slice.call(arguments, 1));

  this.name = arguments[0];
  this.age = arguments[1];
}

var person = new Person("palmtoy", 21, "12");

//测试
console.log("name: " + person.name + "\n" + "age: " + person.age);

