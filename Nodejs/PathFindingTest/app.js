var PF = require('pathfinding');

var matrix = [
    [0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
];

var grid = new PF.Grid(5, 4, matrix);
var gridBackup = grid.clone();
console.log('1 ~ grid = %j', grid);

var finder = new PF.AStarFinder({
    allowDiagonal: true,
    dontCrossCorners: true
});

var path = finder.findPath(1, 2, 4, 2, grid);

console.log('path    = %j', path);

var newPath = PF.Util.smoothenPath(grid, path);
console.log('newPath = %j', newPath);


console.log('2 ~ grid = %j', grid);
