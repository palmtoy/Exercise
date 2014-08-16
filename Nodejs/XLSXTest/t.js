var buffer = require('fs').readFileSync('./GearConfig.xlsx');
var content = require('xlsx').read(buffer).Sheets;
var ret = {worksheets: []};

var toNumberBase10 = function(s) {
  if(s.length === 0) {
    return 0;
  }

  s = s.toUpperCase();

  var n = 0;
  for(var i = s.length - 1, j = 1; i >= 0; i--, j *= 26){
    var c = s.charCodeAt(i);
    if (c < 'A'.charCodeAt(0) || c > 'Z'.charCodeAt(0)) {
      return 0;
    }
    n += (c - 64) * j;
  }
  return n;
};

var toNumberBase26 = function(n) {
  var s = '';
  while(n > 0) {
    var m = n % 26;
    if(m === 0) {
      m = 26;
    }
    s = String.fromCharCode(m + 64) + s;
    n = Math.floor((n - m) / 26);
  }
  return s;
};

var generateAllColumnName = function(keysList, obj) {
  var maxColumn = 0;
  var maxRow = 0;

  keysList.forEach(function(v) {
    var pos = v.search(/\d+/);
    var column = v.slice(0, pos);
    column = toNumberBase10(column);
    var row = parseInt(v.slice(pos));
    if(column > maxColumn) {
      maxColumn = column;
    }
    if(row > maxRow) {
      maxRow = row;
    }
  });

  for(var i = 0; i < maxRow; i++) {
    obj.data.push([]);
  }

  var cNameList = [];
  var cBegin = toNumberBase10('A');
  for(var j = cBegin; j <= maxColumn; j++) {
    var cName = toNumberBase26(j);
    cNameList.push(cName);
  }
  console.log('cNameList = ', JSON.stringify(cNameList));

  var allColumnName = [];
  for(var k = 1; k <= maxRow; k++) {
    cNameList.forEach(function(cName) {
      allColumnName.push(cName + k);
    });
  }

  return allColumnName;
};

for(var sheetName in content) {
  var obj = {name: sheetName, data: []};
  delete content[sheetName]['!ref'];

  var keysList = Object.keys(content[sheetName]);
  keysList = generateAllColumnName(keysList, obj);
  console.log('keysList = ', JSON.stringify(keysList));

  for(var i = 0; i < keysList.length; i++) {
    var key = keysList[i];
    var pos = key.search(/\d+/);
    var row = parseInt(key.slice(pos));

    var v = NaN;
    if(!!content[sheetName][key]) {
      v = content[sheetName][key].v;
    }
    var o = {'value': v, 'formatCode': 'General'};
    obj.data[row-1].push(o);
  }

  ret.worksheets.push(obj);
}

console.log('ret.worksheets = ', JSON.stringify(ret.worksheets));

