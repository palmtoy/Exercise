// iteratively
function binSearch(tmpL, iStart, iEnd, num) {
  while(iStart <= iEnd) {
    console.log('XXX ~ iStart, iEnd, num =', iStart, iEnd, num);

    var iMid = Math.floor((iStart + iEnd) / 2);

    if(tmpL[iMid] === num) {
      console.log('AAA ~ iMid =', iMid, '\n');
      return console.log('Find it => iMid, num =', iMid, num);
    } else if(tmpL[iMid] < num) {
      console.log('BBB ~ iMid =', iMid, '\n');
      iStart = iMid + 1;
    } else {
      console.log('CCC ~ iMid =', iMid);
      console.log('typeof tmpL[iMid], tmpL[iMid] =', typeof tmpL[iMid], tmpL[iMid], '\n');
      iEnd = iMid - 1;
    }
  }

  console.log('The num `' + num + '` is NOT in this list!');
}


var sampleList = [];
for(var i = 0; i < 100; i++) {
  if(i % 2 === 1) {
    sampleList.push(i);
  }
}

console.log('sampleList =', JSON.stringify(sampleList), '\n');

var num = parseInt(process.argv[2]);
console.log('typeof num, num =', typeof num, num, '\n');
binSearch(sampleList, 0, sampleList.length-1, num);

