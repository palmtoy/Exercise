#!/usr/bin/env node

const str = '{"errCode":0,"timestamp":1779963503,"data":{"referenceName":"MergeMsg","languageList":[{"language":"en","name":"Happy Day!"}],"gData":{"name":"MergeMsg","langMap":{"ja-JP":"ja"}},"aData":{"name":"MergeMsg","langMap":{"ja":"ja"}}}}';

const obj = JSON.parse(str);

console.log('\nJSON.stringify(obj, null, 2) =');
console.log(JSON.stringify(obj, null, 2));

console.log('\nconsole.dir(obj, { depth: null }) =');
console.dir(obj, { depth: null });
console.log();

