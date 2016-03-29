var clone = require('node-v8-clone').clone;

var d = require('./data.json');
console.log('  d: ', d.skillBar[0].localization.description.id);

var dcd = clone(d, true);
console.log('dcd: ', dcd.skillBar[0].localization.description.id);
console.log();

console.log('d...description === dcd...description -->', d.skillBar[0].localization.description === dcd.skillBar[0].localization.description);
console.log('  d...description = %j', d.skillBar[0].localization.description);
console.log('dcd...description = %j', dcd.skillBar[0].localization.description);
console.log('d...id === dcd...id -->', d.skillBar[0].localization.description.id === dcd.skillBar[0].localization.description.id);
console.log();

console.log('d...display_name === dcd...display_name -->', d.skillBar[0].localization.display_name === dcd.skillBar[0].localization.display_name);
console.log('  d...display_name = %j', d.skillBar[0].localization.display_name);
console.log('dcd...display_name = %j', dcd.skillBar[0].localization.display_name);

