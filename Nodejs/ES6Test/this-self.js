"use strict";

const polyglot = {
	name : "Michel Thomas",
	languages : ["Spanish", "French", "Italian", "German", "Polish"],
	introduce : function () {
		// this.name is "Michel Thomas"
		const self = this;
		this.languages.forEach(function(language) {
			// this.name is undefined, so we have to use our saved "self" variable 
			console.log("My name is " + self.name + ", and I speak " + language + ".");
		});
	}
}

console.log('Polyglot ==>\n');
polyglot.introduce();
console.log('==============================================');

////////////////////////////////////////////////////////////////////////////////////////

let polyglot2 = {
	name : "Michel Thomas",
	languages : ["Spanish", "French", "Italian", "German", "Polish"],
	introduce : function () {
		this.languages.forEach((language) => {
			console.log("My name is " + this.name + ", and I speak " + language + ".");
		});
	}
}

console.log('\n\nPolyglot2 ==>\n');
polyglot2.introduce();

