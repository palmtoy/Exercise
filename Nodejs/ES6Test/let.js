"use strict";

var languages = ['Danish', 'Norwegian', 'Swedish'];

// Pollutes global namespace. Ew!
for (var i = 0; i < languages.length; i += 1) {
	console.log(`${languages[i]} is a Scandinavian language.`);
}

console.log(i); // 3

for (let j = 0; j < languages.length; j += 1) {
	console.log(`${languages[j]} is a Scandinavian language.`);
}

try {
	console.log(j); // Reference error
} catch (err) {
	console.log(`You got a ${err}; no dice.`);
}

