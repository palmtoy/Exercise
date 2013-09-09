var PF = require('pathfinding');
var util = require('util');

var matrix = [
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0]
];
var grid = new PF.Grid(5, 3, matrix);

// console.log('typeof grid = ', typeof grid);
// console.log('\n 1 ~ grid = ', util.inspect(grid, true, null), '\n');

var gridBackup = grid.clone();

// var finder = new PF.AStarFinder();

var finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
});

var path = finder.findPath(1, 2, 4, 2, grid);

// console.log('typeof path = ', typeof path);
console.log('\npath = ', util.inspect(path) + '\n');

// console.log('\n 2 ~ grid = ', util.inspect(grid, true, null), '\n');

// console.log('\n 1 ~ gridBackup = ', util.inspect(gridBackup, true, null), '\n');
