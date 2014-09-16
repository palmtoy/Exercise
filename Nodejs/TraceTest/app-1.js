function Person(name, age)
{
  this.name = arguments[0];
  this.age = arguments[1];

  var tr = console.trace();
  console.log('tr = ', tr)
  console.log('typeof tr = ', typeof tr)
}

var person = new Person("palmtoy", 21, "12");

console.log("name: " + person.name + "\n" + "age: " + person.age);

