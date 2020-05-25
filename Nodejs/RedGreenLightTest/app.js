#!/usr/bin/env node

const trafficLight = (color, time) => {
	return new Promise(function (resolve, reject) {
		setTimeout(function() {
			resolve(new Date() + ' Traffic Light Color: ' + color);
		}, time);
	});
};


const flashLight = () => {
	trafficLight('Red', 3000) // after last task end, which means the last task will need 3s
	.then( (v) => {
		console.log(v);
		return trafficLight('Yellow', 3000); // last spend 3s
	}).then( (v) => {
		console.log(v);
		return trafficLight('Green', 1000); // last spend 1s
	}).then( (v) => {
		console.log(v + '\n');
		return flashLight();
	});
};


console.log(new Date() + ' Begin ~\n');

flashLight();

