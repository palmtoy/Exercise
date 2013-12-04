str = '\u00bd + \u00bc = \u00be';

console.log(str + ": " + str.length + " characters, " +
            Buffer.byteLength(str, 'utf8') + " bytes");

// ½ + ¼ = ¾: 9 characters, 12 bytes


var frosty = new Buffer(24);
var snowman = new Buffer("☃", "utf-8");
frosty.write("Happy birthday! ", "utf-8");

snowman.copy(frosty, 16);

console.log(frosty.toString("utf-8", 0, 19));
// 'Happy birthday! ☃'


var puddle = frosty.slice(16, 19);
puddle.toString();
puddle.write("___");

console.log('\n' + frosty.toString("utf-8", 0, 19));
// 'Happy birthday! ___'

