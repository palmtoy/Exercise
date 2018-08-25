/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {

  const stdTbl = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000,
    'IV': 4,
    'IX': 9,
    'XL': 40,
    'XC': 90,
    'CD': 400,
    'CM': 900,
  };

  const len = s.length;
  let sum = 0;
  for (let i = 0; i < len;) {
    if (i + 1 < len) {
      const tmpStr = s[i] + s[i + 1];
      if (stdTbl[tmpStr] > 0) {
        sum += stdTbl[tmpStr];
        i = i + 2;
        continue;
      }
    }
    const tmpStr = s[i];
    if (stdTbl[tmpStr] > 0) {
      sum += stdTbl[tmpStr];
      i = i + 1;
    }
  }

  return sum;

};


console.log(`III =`, romanToInt('III'));
console.log(`IV =`, romanToInt('IV'));
console.log(`IX =`, romanToInt('IX'));
console.log(`LVIII =`, romanToInt('LVIII'));
console.log(`MCMXCIV =`, romanToInt('MCMXCIV'));
