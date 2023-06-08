#!/usr/bin/env node

global.LZG = 'Hello World';

console.log(`global.keys = ${JSON.stringify(Object.keys(global))}\n`);

console.log(`LZG = ${LZG}`);

