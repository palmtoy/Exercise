// var x = 9; 
x = 9; 
var module = {
    x: 81,
		y: 2,
    getX: function() { return this.x; }
};

console.log(module.getX()); // 81

var getX = module.getX;
console.log(getX()); // 9, because in this case, "this" refers to the global object

// console.log(Object.keys(this));
// cconsole.log(Object.keys(GLOBAL));

// create a new function with 'this' bound to module
var boundGetX = getX.bind(module);
console.log(boundGetX()); // 81

var newModule = {
	x: 99
};

var newBoundGetX = getX.bind(newModule);
console.log(newBoundGetX()); // 99

