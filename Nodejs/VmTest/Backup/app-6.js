var vm = require('vm')
	, fs = require('fs');


var uidsData = 'json = ' + fs.readFileSync(__dirname + '/robot_ids.json');

var tmpSandbox = {
	ObjectId: function(){return 0}
};
vm.runInNewContext(uidsData, tmpSandbox);
    
console.log('\ntypeof tmpSandbox.json =', typeof tmpSandbox.json);
console.log('\ntmpSandbox.json.length =', tmpSandbox.json.length);


var strUid = 'hdel zju_user';
var i = 0;

tmpSandbox.json.forEach(function(o) {
	strUid = strUid + ' ' + o.uid;
	i++;
});

console.log('\ni =', i);
console.log('\nstrUid =>', strUid);

