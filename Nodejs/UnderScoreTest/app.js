#!/usr/bin/env node

var us = require('underscore');

var rawL = [{teamIndex: 0, indexOnTeam: 0}, {teamIndex: 0, indexOnTeam: 1}, {teamIndex: 0, indexOnTeam: 2}, {teamIndex: 1, indexOnTeam: 1}, {teamIndex: 0, indexOnTeam: 2}];
console.log('rawL = ', rawL, '\n');

var retL = us.uniq(rawL, function(item) {return JSON.stringify(item);});
console.log('retL = ', retL, '\n');

////////////////////////////////////////////////////////////

// lines have length
const line = { length: 7 };

// planes have width and inherit length
const plane = Object.create(line);
plane.width = 8;
console.log(`plane.length = ${plane.length}`); // 7

// making a cube object, using extend
const cube = us.extend({ height: 9 }, plane)
console.log(` cube.length = ${cube.length}`); // 7

const fourDObj = cube;
us.extend(fourDObj, { time: 999 });
console.log(`fourDObj.time = ${fourDObj.time}`); // 999

