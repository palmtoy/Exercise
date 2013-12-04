/*定义一个人类*/
function Person(name, age)
{
  this.name = name;
  this.age = age;
}

/*定义一个学生类*/
function Student(name, age, grade)
{
  Person.apply(this, arguments);
  this.grade = grade;
}

//创建一个学生对象
var student = new Student("palmtoy", 21, "12");

//测试
console.log("name: " + student.name + "\n" + "age: " + student.age + "\n" + "grade: " + student.grade);
//学生类里面没有给name和age属性赋值, 为什么又存在这两个属性的值呢? 这个就是apply的神奇之处.

/////////////////////////////////////////////

/* min/max number in an array */
var numbers = [5, 6, 2, 3, 7];

/* using Math.min/Math.max apply */
/* This about equal to Math.max(numbers[0], ...) or Math.max(5, 6, ..) */
var max = Math.max.apply(null, numbers);
var min = Math.min.apply(null, numbers);

console.log('\nmax = %d, min = %d', max, min);

/////////////////////////////////////////////

var arr1 = new Array("1", "2", "3");

var arr2 = new Array("4", "5", "6");

Array.prototype.push.apply(arr1, arr2);

console.log('\narr1 = %j', arr1);

