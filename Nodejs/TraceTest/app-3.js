function Person(name, age)
{
  this.name = arguments[0];
  this.age = arguments[1];

  var tr = Error().stack;
  console.log('tr = ', tr, '\n')
  console.log('typeof tr = ', typeof tr)
}

var person = new Person("palmtoy", 21, "12");

