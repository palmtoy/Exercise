const XLSX = require('xlsx');

// create a new blank workbook
var wb = XLSX.utils.book_new();

wb.SheetNames = ["Gear"];

wb.Sheets = {
  "Gear": {
    "!ref": "A1:C2",
    "A1": { "v": "GearID" }, "A2": { "v": "EPIC.MDEF" },
    "B1": { "v": "GearName" }, "B2": { "v": "EPIC.PDEF" },
    "C1": { "v": "GearAttrVal" }, "C2": { "v": 3.1415926 }
  }
};

XLSX.writeFileAsync('./MyGearConfig.xlsx', wb, {}, ()=>{});
