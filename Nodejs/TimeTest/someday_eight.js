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


var fiveDaysTime = 5 * 24 * 60 * 60; // unit: second
var twoDaysTime = 2 * 24 * 60 * 60; // unit: second

var todayEight = getTodayZero() + 8 * 60 * 60; // unit: second
var fiveDaysAgoEight = todayEight - fiveDaysTime;
var twoDaysAgoEight = todayEight - twoDaysTime;
var twoDayLaterEight = todayEight + twoDaysTime;

console.log('  5 days ago =', fiveDaysAgoEight);
console.log('  2 days ago =', twoDaysAgoEight);
console.log('2 days later =', twoDayLaterEight);

