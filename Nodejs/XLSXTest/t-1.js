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

var keysList = [ 'C3', 'A4', 'A5', 'B5', 'A6', 'B6', 'A1', 'B1', 'A2', 'B2', 'A3' ];
console.log('Before ~ keysList = ', keysList);
keysList.sort(compareFunc);
console.log('After  ~ keysList = ', keysList);

