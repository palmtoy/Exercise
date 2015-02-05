var o1 = {teamIndex: 0, indexOnTeam: 1};
var o2 = {indexOnTeam: 1, teamIndex: 0};

var s1 = JSON.stringify(o1);
var s2 = JSON.stringify(o2);

console.log('s1 = ', s1);
console.log('s2 = ', s2);

if(s1 === s2) {
  console.log('\ns1 equals s2.\n');
} else {
  console.log('\ns1 not equals s2!\n');
}

////////////////////////////////////////

var newObj1 = {};
newObj1.teamIndex = o1.teamIndex;
newObj1.indexOnTeam = o1.indexOnTeam;

var newObj2 = {};
newObj2.teamIndex = o2.teamIndex;
newObj2.indexOnTeam = o2.indexOnTeam;

s1 = JSON.stringify(newObj1);
s2 = JSON.stringify(newObj2);

console.log('s1 = ', s1);
console.log('s2 = ', s2);

if(s1 === s2) {
  console.log('\ns1 equals s2.\n');
} else {
  console.log('\ns1 not equals s2!\n');
}

