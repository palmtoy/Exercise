var vm = require('vm')
	, fs = require('fs');


var uidsData = 'json = ' + fs.readFileSync(__dirname + '/robot_ids.json');

var tmpSandbox = {
	ObjectId: function(){return 0}
};
vm.runInNewContext(uidsData, tmpSandbox);
    
console.log('\ntypeof tmpSandbox.json =', typeof tmpSandbox.json);
console.log('\ntmpSandbox.json.length =', tmpSandbox.json.length, '\n');


var strTemplate = 'db.students.update({uid: UidTemplate}, {$set: {isLeader: NumberInt(1)}});' 
var i = 0;


var uidTemplate = "UidTemplate";

tmpSandbox.json.forEach(function(o) {
	var tmpStr = strTemplate.replace(uidTemplate, o.uid);
	console.log(tmpStr);
	i++;
});

console.log('\ni =', i);

