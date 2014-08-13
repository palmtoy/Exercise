var buffer = require('fs').readFileSync('./TestTableReference-saveas.xlsx');

var content = require('xlsx').read(buffer).Sheets;
console.log('content = ', JSON.stringify(content));

var ret = {worksheets: []};


function compareFunc(objA, objB) {
  var posA = objA.search(/\d+/);
  var strA = objA.slice(0, posA);
  var rowA = parseInt(objA.slice(posA));

  var posB = objB.search(/\d+/);
  var strB = objB.slice(0, posB);
  var rowB = parseInt(objB.slice(posB));

  if(rowA !== rowB) {
    return rowA - rowB;
  } else {
    if(strA.length !== strB.length) {
      return strA.length - strB.length;
    } else {
      if(strA > strB) {
        return 1;
      } else {
        return -1;
      }
    }
  }
}


for(var sheetName in content) {
  var obj = {name: sheetName, data: []};
  var rStr = content[sheetName]['!ref']; 
  var rList = rStr.split(':');
  delete content[sheetName]['!ref'];

  var pos = rList[0].search(/\d+/);
  var rBegin = parseInt(rList[0].slice(pos));

  pos = rList[1].search(/\d+/);
  var rEnd = parseInt(rList[1].slice(pos));

  for(var i = rBegin; i <= rEnd; i++) {
    obj.data.push([]);
  }

  var keysList = Object.keys(content[sheetName]);
  console.log('Before ~ keysList = ', keysList);
  keysList.sort(compareFunc);
  console.log('After ~ keysList = ', keysList);

  for(var i = 0; i < keysList.length; i++) {
    var key = keysList[i];
    var pos = key.search(/\d+/);
    var row = parseInt(key.slice(pos));

    var v = content[sheetName][key].v;
    var o = {'value': v, 'formatCode': 'General'};
    obj.data[row-1].push(o);
  }

  ret.worksheets.push(obj);
}

console.log('ret.worksheets = ', JSON.stringify(ret.worksheets));

