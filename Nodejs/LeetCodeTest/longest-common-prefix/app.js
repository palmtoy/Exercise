/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {

  const originListLen = strs.length;
  if (originListLen <= 0) {
    return '';
  }

  let shortestStr = strs[0];
  let refKey = 0;
  for (let i = 1; i < originListLen; ++i) {
    if (shortestStr.length > strs[i].length) {
      shortestStr = strs[i];
      refKey = i;
    }
  }

  while (shortestStr.length > 0) {
    let n = 0;
    for (let j = 0; j < originListLen; j++) {
      if (j === refKey || strs[j].substring(0, shortestStr.length) === shortestStr) {
        ++n;
      } else {
        break;
      }
      if (n === originListLen) {
        return shortestStr;
      }
    }
    shortestStr = shortestStr.substring(0, shortestStr.length - 1);
  }

  return '';

};

console.log(`longest common prefix(0) =`, longestCommonPrefix(["a"]));
console.log(`longest common prefix(1) =`, longestCommonPrefix(["ca", "a"]));
console.log(`longest common prefix(2) =`, longestCommonPrefix(["flower", "flow", "flight"]));
console.log(`longest common prefix(3) =`, longestCommonPrefix(["dog", "racecar", "car"]));
console.log(`longest common prefix(4) =`, longestCommonPrefix(["xyzpxx", "xyzu", "xyzmv"]));
