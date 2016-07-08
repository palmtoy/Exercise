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



var fourDaysTime = sevenDaysTime / 7 * 4; // unit: second
var fourDaysAgoZero = todayZero - fourDaysTime;
console.log('\n fourDaysAgoZero =', fourDaysAgoZero);

var threeDaysTime = sevenDaysTime / 7 * 3; // unit: second
var threeDaysAgoZero = todayZero - threeDaysTime;
console.log('\n threeDaysAgoZero =', threeDaysAgoZero);


var lastPeriodTS = 1467849187 + 420 - 7;
var lastPeriod = new Date(lastPeriodTS * 1000);
console.log('\n lastPeriod =', lastPeriod);

var threeDaysAgoLastPeriodTS = lastPeriodTS - threeDaysTime;
var threeDaysAgoLastPeriod = new Date(threeDaysAgoLastPeriodTS * 1000);
console.log('\n threeDaysAgoLastPeriod =', threeDaysAgoLastPeriod);

console.log('\n threeDaysAgoLastPeriodTS =', threeDaysAgoLastPeriodTS);

