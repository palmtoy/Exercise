var ll = [{"qualityLv":"Epic","lvReq":40},{"qualityLv":"Epic","lvReq":40}];
var tmpL = ll.slice();

tmpL[0].qualityLv = 'Hello World';

console.log('tmpL = ', JSON.stringify(tmpL));
console.log('ll = ', JSON.stringify(tmpL));

/*
Output:

tmpL =  [{"qualityLv":"Hello World","lvReq":40},{"qualityLv":"Epic","lvReq":40}]
ll =  [{"qualityLv":"Hello World","lvReq":40},{"qualityLv":"Epic","lvReq":40}]
*/

