function* foo(index) {
  while (index < 2) {
    yield index++;
  }
}

const iterator = foo(0);

console.log(iterator.next().value);
// expected output: 0

console.log(iterator.next().value);
// expected output: 1

console.log(iterator.next().value + '\n');
// expected output: undefined

///////////////////////////////////

function* generator(i) {
  yield i;
  yield i + 20;
}

var gen = generator(10);

console.log(gen.next().value);
// expected output: 10

console.log(gen.next().value);
// expected output: 20

console.log(gen.next().value + '\n');
// expected output: undefined

///////////////////////////////////

function* idMaker() {
  var index = 0;
  while (index < index+1)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value + '\n'); // 3
// ...

///////////////////////////////////

function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield* anotherGenerator(i);
  yield i + 10;
}

var gen = generator(10);

console.log(gen.next().value); // 10
console.log(gen.next().value); // 11
console.log(gen.next().value); // 12
console.log(gen.next().value); // 13
console.log(gen.next().value); // 20
console.log(gen.next().value + '\n'); // undefined

///////////////////////////////////

function* logGenerator() {
  console.log(0);
  console.log(1, yield);
  console.log(2, yield);
  console.log(3, yield);
  console.log(6, yield);
}

var gen = logGenerator();

// the first call of next executes from the start of the function
// until the first yield statement
gen.next();             // 0
gen.next('pretzel');    // 1 pretzel
gen.next('california'); // 2 california
gen.next('mayonnaise'); // 3 mayonnaise
gen.next('tea'); // 6 'tea'
console.log();

///////////////////////////////////

function* yieldAndReturn() {
  yield "Y";
  return "R";
  yield "unreachable";
}

var gen = yieldAndReturn()
console.log(gen.next()); // { value: "Y", done: false }
console.log(gen.next()); // { value: "R", done: true }
console.log(gen.next()); // { value: undefined, done: true }
console.log();

///////////////////////////////////

const foo2 = function* () {
  yield 10;
  yield 20;
};

const bar = foo2();
// {value: 10, done: false}
console.log(bar.next());
console.log(bar.next());
console.log(bar.next());

