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

  let sum = 0;
  for (let i = 0; i < s.length;) {
    if (i + 1 < s.length) {
      const tmpStr = s[i] + s[i+1];
      if (stdTbl[tmpStr] > 0) {
        sum += stdTbl[tmpStr];
        i = i + 2;
        continue;
      }
    }
    if (stdTbl[s[i]] > 0) {
      sum += stdTbl[s[i]];
    }
    ++i;
  }
  return sum;

};


console.log(`III =`, romanToInt('III'));
console.log(`IV =`, romanToInt('IV'));
console.log(`IX =`, romanToInt('IX'));
console.log(`LVIII =`, romanToInt('LVIII'));
console.log(`MCMXCIV =`, romanToInt('MCMXCIV'));
