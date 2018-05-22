console.log(`\`` === '`'); // true

console.log(`
string text line 1
string text line 2
`);
// "string text line 1
// string text line 2"

var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and
not ${2 * a + b}.
`);
// "Fifteen is 15 and
// not 20."

////////////////////////////////////////////

function isLargeScreen() {
	return false;
}

let item = {
	isCollapsed: false 
}

var classes = 'header';
classes += (isLargeScreen() ?
						'' : item.isCollapsed ?
						' icon-expander' : ' icon-collapser');
console.log(`classes = ${classes}
`);

const classes2 = `header ${ isLargeScreen() ?
														'' : (item.isCollapsed ?
														'icon-expander' : 'icon-collapser') }`;
console.log(`classes2 = ${classes2}
`);

const classes3 = `header ${ isLargeScreen() ?
														'' : `icon-${item.isCollapsed ?
														'expander' : 'collapser'}` }`;
console.log(`classes3 = ${classes3}
`);
////////////////////////////////////////////

var person = 'Mike';
var age = 28;

function myTag(strings, personExp, ageExp) {
	var str0 = strings[0]; // "that "
	var str1 = strings[1]; // " is a "

	// There is technically a string after
	// the final expression (in our example),
	// but it is empty (""), so disregard.
	// var str2 = strings[2];

	var ageStr;
	if (ageExp > 99){
		ageStr = 'centenarian';
	} else {
		ageStr = 'youngster';
	}

	return str0 + personExp + str1 + ageStr;
}

var output = myTag`that ${ person } is a ${ age }`;

console.log(output);
// that Mike is a youngster
////////////////////////////////////////////

function myTemplate(strings, ...keys) {
	return (function(...values) {
		var dict = values[values.length - 1] || {};
		var result = [strings[0]];
		keys.forEach(function(key, i) {
			var value = Number.isInteger(key) ? values[key] : dict[key];
			result.push(value, strings[i + 1]);
		});
		return '\n' + result.join('');
	});
}

var t1Closure = myTemplate`${0}${1}${0}!`;
console.log(t1Closure('Y', 'A'));  // "YAY!"

var t2Closure = myTemplate`${0} ${'foo'}!`;
console.log(t2Closure('Hello', {foo: 'World'}));  // "Hello World!"
////////////////////////////////////////////

console.log();
function tag(strings) {
	console.log(strings.raw[0]);
}

tag`string text line 1 \n string text line 2`;
// logs "string text line 1 \n string text line 2",
// including the two characters '\' and 'n'

var str = String.raw`Hi\n${2+3}!`; // "Hi\n5!"
console.log(str.length); // 6
console.log(str.split('').join(',')); // "H,i,\,n,5,!"
////////////////////////////////////////////

console.log();
// console.log(`\unicode`); // SyntaxError: Invalid Unicode escape sequence
console.log(`\u00A9 - \u{2F804}\n`);

function myLatex(str) { 
 return { "cooked": str[0], "raw": str.raw[0] }
} 

console.log(myLatex`\unicode`); // { cooked: undefined, raw: "\\unicode" }

