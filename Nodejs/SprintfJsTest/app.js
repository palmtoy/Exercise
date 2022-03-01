#!/usr/bin/env node

const sprintf = require('sprintf-js').sprintf,
	vsprintf = require('sprintf-js').vsprintf;


let sRet = sprintf('%2$s %3$s a %1$s', 'cracker.', 'Polly', 'wants');
let vRet = vsprintf('The first 4 letters of the english alphabet are: %s, %s, %s and %s.', ['a', 'b', 'c', 'd']);
console.log(`pt ~ A ~ sRet => ${sRet}`);
console.log(`pt ~ A ~ vRet => ${vRet}`);


sRet = sprintf('%s %s some %s', 'I', 'want', 'apples.');
console.log(`\npt ~ B ~ sRet => ${sRet}`);


let paramList = ['The last 3 letters of the english alphabet are: x, y, z.'];
vRet = vsprintf(paramList[0], paramList.slice(1));
console.log(`\npt ~ C ~ vRet => ${vRet}###`);


paramList = ['The last 4 letters of the english alphabet are: %s, x, y, z.', 'w'];
vRet = vsprintf(paramList[0], paramList.slice(1));
console.log(`\npt ~ D ~ vRet => ${vRet}###`);


paramList = ['The string is "%s", the object is %o, the number is %d.', 'foo ~ bar', JSON.stringify({ hi: 'baby' }), 999, ' -- Hello World', ` ~ ${new Date()}`];
let firstParma = paramList[0];
firstParma = firstParma.replace(/%o/g, '%s');
firstParma = firstParma.replace(/%d/g, '%s');
const cnt = (firstParma.match(/%s/g) || []).length;
postfixList = paramList.slice(1);
for(let i = 0; i < postfixList.length - cnt; i++) {
	firstParma += '%s';
}
vRet = vsprintf(firstParma, postfixList);
console.log(`\npt ~ F ~ vRet => ${vRet}###`);

