var msgpack = require('msgpack5')() // namespace our extensions
	, a       = new MyType(2, 'a')
	, encode  = msgpack.encode
	, decode  = msgpack.decode;

function MyType(size, value) {
	this.size  = size;
	this.value = value;
}

function mytipeEncode(obj) {
	console.log(`\n<---`);
	console.log(`mytipeEncode ~ obj = ${JSON.stringify(obj)}`);
	console.log(`--->\n`);
	var buf = new Buffer(obj.size);
	buf.fill(obj.value);
	return buf;
}

function mytipeDecode(data) {
	console.log(`\n$---`);
	console.log(`mytipeDecode ~ data = ${data}`);
	console.log(`---$\n`);
	var result = new MyType(data.length, data.toString('utf8', 0, 1))
		, i;

	for (i = 0; i < data.length; i++) {
		if (data.readUInt8(0) != data.readUInt8(i)) {
			throw new Error('should all be the same');
		}
	}

	return result;
}


msgpack.register(0x1, MyType, mytipeEncode, mytipeDecode);

console.log(encode({ 'hello': 'world' }).toString('hex')); // 81a568656c6c6fa5776f726c64

console.log(decode(encode({ 'hello': 'world' }))); // { hello: 'world' }

console.log(encode(a)); // <Buffer d5 01 61 61>
console.log(encode(a).toString('hex')); // d5016161

console.log(decode(encode(a)) instanceof MyType); // true

console.log(decode(encode(a))); // MyType { size: 2, value: 'a' }

