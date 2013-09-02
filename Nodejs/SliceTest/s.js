var my_object = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    length: 6
};

var sliced = Array.prototype.slice.call(my_object, 3);
console.log(JSON.stringify(sliced));

