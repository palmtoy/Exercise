const XLSX = require('xlsx');

const workbook = XLSX.readFile('./GearConfig.xlsx');
var sheetsData = workbook.Sheets;
var wbSheetsInput = [];

function toNumberBase10(s) {
  if(s.length === 0) {
    return 0;
  }

  s = s.toUpperCase();

  let n = 0;
  for(let i = s.length - 1, j = 1; i >= 0; i--, j *= 26){
    const c = s.charCodeAt(i);
    if (c < 'A'.charCodeAt(0) || c > 'Z'.charCodeAt(0)) {
      return 0;
    }
    n += (c - 64) * j;
  }
  return n;
};

function toNumberBase26(n) {
  let s = '';
  while(n > 0) {
    let m = n % 26;
    if(m === 0) {
      m = 26;
    }
    s = String.fromCharCode(m + 64) + s;
    n = Math.floor((n - m) / 26);
  }
  return s;
};

function generateAllColumnName(keysList) {
  let maxColumn = 0;
  let maxRow = 0;

  keysList.forEach(function(v) {
    const pos = v.search(/\d+/);
    let column = v.slice(0, pos);
    column = toNumberBase10(column);
    const row = parseInt(v.slice(pos));
    if(column > maxColumn) {
      maxColumn = column;
    }
    if(row > maxRow) {
      maxRow = row;
    }
  });

  let cNameList = [];
  const cBegin = toNumberBase10('A');
  for(let j = cBegin; j <= maxColumn; j++) {
    const cName = toNumberBase26(j);
    cNameList.push(cName);
  }
  console.log('cNameList = ', JSON.stringify(cNameList));

  let allColumnName = [];
  for(let k = 1; k <= maxRow; k++) {
    cNameList.forEach(function(cName) {
      allColumnName.push(cName + k);
    });
  }

  return allColumnName;
};

for(const sheetName in sheetsData) {
  let obj = {name: sheetName, data: {}};
  delete sheetsData[sheetName]['!ref'];
  delete sheetsData[sheetName]['!margins'];

  let keysList = Object.keys(sheetsData[sheetName]);
  keysList = generateAllColumnName(keysList);
  console.log('keysList = ', JSON.stringify(keysList));

  for(let i = 0; i < keysList.length; i++) {
    const key = keysList[i];
    const pos = key.search(/\d+/);
    const row = parseInt(key.slice(pos));

    let v = null;
    if(!!sheetsData[sheetName][key]) {
      v = sheetsData[sheetName][key].v;
    }
    obj.data[row] = obj.data[row] || [];
    obj.data[row].push(v);
  }

  wbSheetsInput.push(obj);
}

console.log('wbSheetsInput = ', JSON.stringify(wbSheetsInput));

/////////////////////////////////////////////////////////////////

// create a new blank workbook
let wb = XLSX.utils.book_new();

wb.SheetNames = [];
wb.Sheets = {};

for(let i = 0; i < wbSheetsInput.length; i++) {
  let tmpName = wbSheetsInput[i].name;
  wb.SheetNames.push(tmpName);
  wb.Sheets[tmpName] = {};
  let maxRow = 0
    , maxCol = 0;
  for(const row in wbSheetsInput[i].data) {
    maxRow = parseInt(row) > maxRow ? parseInt(row) : maxRow;
    const tmpL = wbSheetsInput[i].data[row];
    maxCol = tmpL.length > maxCol ? tmpL.length : maxCol;
    for(let j = 0; j < tmpL.length; j++) {
      const k = toNumberBase26(j+1) + row;
      wb.Sheets[tmpName][k] = {'v': tmpL[j] || ''};
    }
  }
  wb.Sheets[tmpName]['!ref'] = 'A1:' + (toNumberBase26(maxCol) + maxRow);

  XLSX.writeFileAsync('./OutputGearConfig.xlsx', wb, {}, ()=>{});
}
