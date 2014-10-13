function factorial (n) {
    return !(n > 1) ? 1 : factorial(n - 1) * n;
}

var ret = [1,2,3,4,5].map(factorial);

console.log('A ~ ret = ', JSON.stringify(ret));


ret = [1,2,3,4,5].map(function (n) {
    return !(n > 1) ? 1 : arguments.callee(n - 1) * n;
});

console.log('B ~ ret = ', JSON.stringify(ret));


ret = [1,2,3,4,5].map(function factorial (n) {
    return !(n > 1) ? 1 : factorial(n-1)*n;
});

console.log('C ~ ret = ', JSON.stringify(ret));

