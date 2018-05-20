"use strict";

const speakingObj = {
	// Track how many times "speak" has been called 
	words : [],

	speak (word) {
		this.words.push(word);
		console.log('speakingObj says ' + word + '!');
	}
};

// This is just to prove a point. I definitely wouldn't write it this way.
function getCalled () {
	// Returns latest word
	const words = this.words;
	if (!words.length)
		return 'speakingObj hasn\'t spoken, yet.';
	else
		return words[words.length - 1];
};

// Object.defineProperty(OBJECT, "property name", {get: function () {...}})
Object.defineProperty(speakingObj, "called", {get: getCalled});

console.log(speakingObj.called); // 'speakingObj hasn't spoken, yet.'
speakingObj.speak('blargh'); // 'speakingObj says blargh!'
console.log(speakingObj.called); // 'blargh'

