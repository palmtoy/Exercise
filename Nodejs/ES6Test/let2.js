"use strict";

// Simple & Clean
for (let i = 1; i <= 3; i += 1) {
	setTimeout(function() {
		console.log(new Date() + " ~ AAA(i) ~ I've waited " + i + " seconds!\n");
	}, 1000 * i);
}

// Totally dysfunctional
for (var j = 0; j < 3; j += 1) {
	setTimeout(function() {
		console.log(new Date() + " ~ BBB(j) ~ I've waited " + j + " seconds for this!\n");
	}, 1000 * j);
}

