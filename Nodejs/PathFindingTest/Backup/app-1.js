var PF = require('pathfinding');
var util = require('util');

var matrix = [
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0],
];
var grid = new PF.Grid(5, 3, matrix);

// var gridBackup = grid.clone();

var finder = new PF.AStarFinder();

var path = finder.findPath(1, 2, 4, 2, grid);

console.log('typeof path = ', typeof path);
console.log('path = ', util.inspect(path));
