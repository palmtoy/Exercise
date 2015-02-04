var us = require('underscore');

var rawL = [{teamIndex: 0, indexOnTeam: 0}, {teamIndex: 0, indexOnTeam: 1}, {teamIndex: 0, indexOnTeam: 2}, {teamIndex: 1, indexOnTeam: 1}, {teamIndex: 0, indexOnTeam: 2}];
console.log('rawL = ', rawL, '\n');

var retL = us.uniq(rawL, function(item) {return JSON.stringify(item);});
console.log('retL = ', retL, '\n');

