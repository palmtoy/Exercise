var mongoose = require('mongoose');


async function try2saveAndFind() {
	try {
		var conn = await mongoose.connect('mongodb://localhost/test');
		console.log(Date.now() + " ~ conn.connection.readyState = " + conn.connection.readyState + ", connect to MongoDB OK.\n");
	} catch(e) {
		console.log(Date.now() + " ~ Failed to MongoDB - " + e);
	}

	let kittySchema = mongoose.Schema({
		name: String
	});

	// NOTE: methods must be added to the schema before compiling it with mongoose.model()
	kittySchema.methods.speak = function () {
		let greeting = this.name
			? "Meow name is " + this.name + "."
			: "I don't have a name";
		console.log(greeting, '\n');
	}

	let Kitten = conn.model('Kitten', kittySchema);

	let silence = new Kitten({ name: 'Silence' });
	let fluffy = new Kitten({ name: 'Fluffy' });

	try {
		await silence.save().then(rs => {
			rs.speak(); // "Meow name is Silence."
		});

		await fluffy.save().then(rs => {
			rs.speak(); // "Meow name is Fluffy."
		});

		await Kitten.find().then(kittens => {
			console.log(kittens);
			console.log();
		});

		await Kitten.find({ name: /^Fluff/ }).then(kittens => {
			console.log(kittens);
			process.exit();
		});
	} catch(e) {
		console.log(Date.now() + " ~ Failed to do some db operations - " + e);
	}
}

try2saveAndFind();

