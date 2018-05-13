"use strict";

let languages = ["Spanish", "French", "Italian", "German", "Polish"];

// In a multiline arrow function, you must use curly braces, 
//  and you must include an explicit return statement.
let languages_lower1 = languages.map((language) => {
	return language.toLowerCase()
});
console.log('languages_lower1 = ' + languages_lower1); // ["spanish", "french", "italian", "german", "polish"]

// In a single-line arrow function, curly braces are optional,
//   and the function implicitly returns the value of the last expression.
//   You can include a return statement if you'd like, but it's optional.
let languages_lower2 = languages.map((language) => language.toLowerCase());
console.log('languages_lower2 = ' + languages_lower2); // ["spanish", "french", "italian", "german", "polish"]

// If your arrow function only takes one argument, you don't need to wrap it in
//   parentheses. 
let languages_lower3 = languages.map(language => language.toLowerCase());
console.log('languages_lower3 = ' + languages_lower3); // ["spanish", "french", "italian", "german", "polish"]

// If your function takes multiple arguments, you must wrap them in parentheses.
let languages_lower4 = languages.map((language, unused_param) => language.toLowerCase());
console.log('languages_lower4 = ' + languages_lower4); // ["spanish", "french", "italian", "german", "polish"]

// Finally, if your function takes no arguments, you must include empty parentheses before the arrow.
(() => console.log("\nHello!"))();

