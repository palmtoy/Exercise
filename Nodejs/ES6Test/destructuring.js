let a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20
console.log();

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]
console.log();

({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20
console.log();

// Stage 3 proposal
({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});
console.log(a); // 10
console.log(b); // 20
console.log(rest); //{c: 30, d: 40}
console.log();

let x = [1, 2, 3, 4, 5];
let [y, z] = x;
console.log(y); // 1
console.log(z); // 2
console.log();

let foo = ["one", "two", "three"];
let [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
console.log();

let a2, b2;
[a2, b2] = [1, 2];
console.log(a2); // 1
console.log(b2); // 2
console.log();

let a3, b3;
[a3=5, b3=7] = [1];
console.log(a3); // 1
console.log(b3); // 7
console.log();

let a4 = 1, b4 = 3;
[a4, b4] = [b4, a4];
console.log(a4); // 3
console.log(b4); // 1
console.log();

function f() {
	return [1, 2];
}
let a5, b5; 
[a5, b5] = f(); 
console.log(a5); // 1
console.log(b5); // 2
console.log();

function f2() {
	return [1, 2, 3];
}
let [a6, , b6] = f2();
console.log(a6); // 1
console.log(b6); // 3
console.log();

let [a7, ...b7] = [1, 2, 3];
console.log(a7); // 1
console.log(b7); // [2, 3]
console.log();

/*
	 let [a8, ...b8,] = [1, 2, 3]; // SyntaxError: Rest element must be last element
	 console.log();
	 */

let url = "https://developer.mozilla.org/en-US/Web/JavaScript";
let parsedURL = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);
console.log(parsedURL); // ["https://developer.mozilla.org/en-US/Web/JavaScript", "https", "developer.mozilla.org", "en-US/Web/JavaScript"]
let [, protocol, fullhost, fullpath] = parsedURL;
console.log(protocol); // "https"
console.log();

let o = {p: 42, q: true, a9: 100, b9: 200};
let {p, q, b9, a9} = o;
console.log(p, q); // 42 true
console.log(a9, b9); // 100 200
console.log();

let o2 = {p: 62, q: false};
let {p: foo2, q: bar2} = o2;
console.log(foo2, bar2); // 62 false
console.log();

let {aa = 10, bb = 5} = {aa: 3};
console.log(aa); // 3
console.log(bb); // 5
console.log();

let {a10: aa2 = 10, b10: bb2 = 5} = {a10: 3};
console.log(aa2); // 3
console.log(bb2); // 5
console.log();

function drawES2015Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {}) {
	console.log(size, cords, radius);
	// do some chart drawing
	console.log();
}
drawES2015Chart({cords: { x: 18, y: 30 }, radius: 30 });

let metadata = {
	title: "Scratchpad",
	translations: [
		{
		locale: "de",
		localization_tags: [ ],
		last_edit: "2014-04-14T08:43:37",
		url: "/de/docs/Tools/Scratchpad",
		title: "JavaScript-Umgebung"
	}
	],
	url: "/en-US/docs/Tools/Scratchpad"
};
let { title: englishTitle, translations: [{ title: localeTitle }] } = metadata;
console.log(englishTitle); // "Scratchpad"
console.log(localeTitle);  // "JavaScript-Umgebung"
console.log();

let people = [
	{
		name: "Mike Smith",
		family: {
			mother: "Jane Smith",
			father: "Harry Smith",
			sister: "Samantha Smith"
		},
		age: 35
	},
	{
		name: "Tom Jones",
		family: {
			mother: "Norah Jones",
			father: "Richard Jones",
			brother: "Howard Jones"
		},
		age: 25
	}
];
for (let {name: n, family: { father: f } } of people) {
	console.log("Name: " + n + ", Father: " + f);
}
console.log();
// "Name: Mike Smith, Father: Harry Smith"
// "Name: Tom Jones, Father: Richard Jones"

function userId({id}) {
  return id;
}
function whois({displayName: displayName, fullName: {firstName: name}}){
  console.log(displayName + " is " + name);
}
let user = { 
  id: 42, 
  displayName: "jdoe",
  fullName: { 
      firstName: "John",
      lastName: "Doe"
  }
};
console.log("userId: " + userId(user)); // "userId: 42"
whois(user); // "jdoe is John"
console.log();

let key = "z";
let { [key]: foo3 } = { z: "bar" };
console.log(foo3); // "bar"
console.log();

let {a11, b11, ...rest2} = {a11: 10, b11: 20, c: 30, d: 40}
console.log(a11, b11, rest2); // 10 20 { c: 30, d: 40 }
console.log();

const foo6 = { 'fizz-buzz': true };
const { 'fizz-buzz': fizzBuzz } = foo6;
console.log(fizzBuzz); // "true"
console.log();

const foo7 = (...args) => {
	console.log(typeof args, '~', args.length, '~', args); // object  ~  3  ~  [ 1, 2, 3 ]
}
foo7( 1, 2, 3 );

