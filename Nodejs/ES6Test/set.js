"use strict";

// Create a new globetrotter!
const globetrotter = {
	// Language spoken in the country our globetrotter is currently in
	current_lang: undefined,

	// Number of countries our globetrotter has travelled to
	countries: 0,

	// See how many countries we've travelled to
	get countryCount () {
		return this.countries;
	}, 

	// Reset current language whenever our globe trotter flies somewhere new
	set languages (language) {
		// Increment number of coutnries our globetrotter has travelled to
		this.countries += 1;

		// Reset current language
		this.current_lang = language; 
	}
};

globetrotter.languages = 'Japanese';
console.log(globetrotter.countryCount); // 1

globetrotter.languages = 'Spanish';
console.log(globetrotter.countryCount); // 2

