var dict = { 'WARRIOR_LEVEL_58_MAX': 0, 'WARRIOR_LEVEL_81_DEMO': 1, 'WARRIOR_LEVEL_1': 2 };

var ll = Object.keys(dict);
console.log('1 ~ ll = ', ll);

ll.sort();

console.log('\n2 ~ ll = ', ll);

ll[0] = 'WARRIOR_LEVEL_0';

console.log('\n3 ~ ll = ', ll);

