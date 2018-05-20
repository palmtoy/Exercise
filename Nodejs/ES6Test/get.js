"use strict";

const speakingObj = {
	// Track how many times "speak" has been called 
	words : [],

	speak (word) {
		this.words.push(word);
		console.log('speakingObj says ' + word + '!');
	},

	get called () {
		// Returns latest word
		const words = this.words;
		if (!words.length)
			return 'speakingObj hasn\'t spoken, yet.';
		else
			return words[words.length - 1];
	}

};

console.log(speakingObj.called); // 'speakingObj hasn't spoken, yet.'

speakingObj.speak('blargh'); // 'speakingObj says blargh!'

console.log(speakingObj.called); // 'blargh'

