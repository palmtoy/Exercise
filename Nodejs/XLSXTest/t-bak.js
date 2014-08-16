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

var generateAllColumnName = function(rList, obj) {
  var pos = rList[0].search(/\d+/);
  var cBegin = rList[0].slice(0, pos);
  cBegin = toNumberBase10(cBegin);
  console.log('cBegin = ', cBegin);
  var rBegin = parseInt(rList[0].slice(pos));

  pos = rList[1].search(/\d+/);
  var cEnd = rList[1].slice(0, pos);
  cEnd = toNumberBase10(cEnd);
  console.log('cEnd = ', cEnd);
  var rEnd = parseInt(rList[1].slice(pos));

  for(var i = rBegin; i <= rEnd; i++) {
    obj.data.push([]);
  }

  var cNameList = [];
  for(var j = cBegin; j <= cEnd; j++) {
    var cName = toNumberBase26(j);
    cNameList.push(cName);
  }
  console.log('cNameList = ', JSON.stringify(cNameList));

  var allColumnName = [];
  for(var k = rBegin; k <= rEnd; k++) {
    cNameList.forEach(function(cName) {
      allColumnName.push(cName + k);
    });
  }

  return allColumnName;
};

for(var sheetName in content) {
  var obj = {name: sheetName, data: []};
  var refStr = '!ref';
  var rStr = content[sheetName][refStr];
  console.log('rStr = ', rStr);
  var rList = rStr.split(':');
  delete content[sheetName][refStr];

  var keysList = generateAllColumnName(rList, obj);

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

// console.log('ret.worksheets = ', JSON.stringify(ret.worksheets));

