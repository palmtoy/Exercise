const XLSX = require('xlsx');

const workbook = XLSX.readFile('./GearConfig.xlsx');

console.log(`AAAAAAAAA =>\n`);
for (const sName of workbook.SheetNames) {
  var wbSheetsInput = XLSX.utils.sheet_to_json(workbook.Sheets[sName]);
  console.log(`sName = ${sName},\nwbSheetsInput = ${JSON.stringify(wbSheetsInput)}\n`, );
}
console.log(`============================================================\n`);


console.log(`BBBBBBBBB =>\n`);
for (const sName of workbook.SheetNames) {
  var wbSheetsInput = XLSX.utils.sheet_to_json(workbook.Sheets[sName], {header: "A"});
  console.log(`sName = ${sName},\nwbSheetsInput = ${JSON.stringify(wbSheetsInput)}\n`, );
}
console.log(`============================================================\n`);


console.log(`CCCCCCCCC =>\n`);
for (const sName of workbook.SheetNames) {
  var wbSheetsInput = XLSX.utils.sheet_to_json(workbook.Sheets[sName], {header: 1});
  console.log(`sName = ${sName},\nwbSheetsInput = ${JSON.stringify(wbSheetsInput)}\n`, );
}
console.log(`============================================================\n`);


console.log(`DDDDDDDDD =>\n`);
for (const sName of workbook.SheetNames) {
  var wbSheetsInput = XLSX.utils.sheet_to_json(workbook.Sheets[sName], {header: 1, raw: false});
  console.log(`sName = ${sName},\nwbSheetsInput = ${JSON.stringify(wbSheetsInput)}\n`, );
}
console.log(`============================================================\n`);
