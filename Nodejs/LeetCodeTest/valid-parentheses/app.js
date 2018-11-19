/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {

  s = s.replace(/\s/g, '');
  if (s.length % 2 === 1) {
    return false;
  }

  const stdTbl = {};
  stdTbl['('] = ')';
  stdTbl['['] = ']';
  stdTbl['{'] = '}';

  while (s.length > 1) {
    const c = s[0];
    const pairChar = stdTbl[c];
    if (pairChar) {
      let pairIdx = s.indexOf(pairChar);
      if (pairIdx === -1) {
        return false;
      } else {
        let idx = s.substring(1, pairIdx).indexOf(c);
        if (idx !== -1) {
          ++idx;
          if ((pairIdx - idx - 1) % 2 === 1) {
            return false;
          }
          s = s.substring(0, idx) + s.substring(idx + 1);
          s = s.substring(0, pairIdx - 1) + s.substring(pairIdx);
        } else {
          if ((pairIdx - 1) % 2 === 1) {
            return false;
          }
          s = s.substring(0, pairIdx) + s.substring(pairIdx + 1);
          s = s.substring(1);
        }
      }
    } else {
      return false;
    }
  }

  return true;

};


console.log(`"[({(())}[()])]" => ${isValid("[({(())}[()])]")}`);
// console.log(`"([)]" => ${isValid("([)]")}`);
// console.log(`"(())[()]" => ${isValid("(())[()]")}`);
// console.log(`"(([]){})" => ${isValid("(([]){})")}`);
// console.log(`"){" => ${isValid("){")}`);
// console.log(`"()[]{}" => ${isValid("()[]{}")}`);
// console.log(`"(]" => ${isValid("(]")}`);
// console.log(`"()" => ${isValid("()")}`);
// console.log(`"{[]}" => ${isValid("{[]}")}`);
