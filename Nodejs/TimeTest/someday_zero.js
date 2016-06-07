#!/usr/bin/env node

var getSomedayZero = function (timestamp) {
	var sdObj = new Date();
	if(timestamp && typeof timestamp === 'number' && timestamp > 0) {
		sdObj = new Date(timestamp * 1000);
	}
	var y = sdObj.getFullYear();
	var m = sdObj.getMonth();
	var d = sdObj.getDate();
	var z = new Date(y, m, d);  // today 00:00:00 (millisecond)
	return z.getTime() / 1000;
};

// get today 00:00:00 (unit: second)
var getTodayZero = function () {
	return getSomedayZero();
};


var sevenDaysTime = 7 * 24 * 60 * 60; // unit: second
var sixDaysTime = sevenDaysTime / 7 * 6; // unit: second

var todayZero = getTodayZero();
var sevenDaysAgoZero = todayZero - sevenDaysTime;
var sixDaysAgoZero = todayZero - sixDaysTime;

console.log('       todayZero =', todayZero);
console.log('sevenDaysAgoZero =', sevenDaysAgoZero);
console.log('  sixDaysAgoZero =', sixDaysAgoZero);

