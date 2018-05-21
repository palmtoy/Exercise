var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

function promiseConnect() {
	return new Promise((resolve, reject) => {
		var db = mongoose.connection;

		db.on('error', function() {
			reject('Mongodb connection error!');
		});


		db.once('open', function() {
			resolve("We're connected to mongodb!");
		});
	});
}


var Kitten = null;
function promiseSave() {
	return new Promise((resolve, reject) => {
		var kittySchema = mongoose.Schema({
			name: String
		});

		// NOTE: methods must be added to the schema before compiling it with mongoose.model()
		kittySchema.methods.speak = function () {
			var greeting = this.name
				? "Meow name is " + this.name
				: "I don't have a name";
				console.log(greeting, '\n');
		}

		Kitten = mongoose.model('Kitten', kittySchema);

		var silence = new Kitten({ name: 'Silence' });
		var fluffy = new Kitten({ name: 'fluffy' });

		silence.save(function (err, s) {
			if (err) {
				reject(err);
			} else {
				s.speak(); // "Meow name is Silence"
			}
		});

		fluffy.save(function (err, f) {
			if (err) {
				reject(err);
			} else {
				fluffy.speak(); // "Meow name is fluffy"
				resolve(f.name + ' saved.');
			}
		});
	});
}

function promiseFind() {
	return new Promise((resolve, reject) => {
		Kitten.find(function (err, kittens) {
			if (err) { reject(err); }
			console.log(kittens);
			console.log();

			Kitten.find({ name: /^fluff/ }, function (err, kittens) {
				if (err) { reject(err); }
				console.log(kittens);
				resolve('Done.');
			});
		});
	});
}


async function go() {
	try {
		let x = await promiseConnect();
		console.log(Date.now() + " ~ resolve x-1 = " + x + "\n");
		x = await promiseSave();
		console.log(Date.now() + " ~ resolve x-2 = " + x + "\n");
		x = await promiseFind();
		console.log("\n" + Date.now() + " ~ resolve x-3 = " + x + "\n");
		process.exit();
	} catch(e) {
		console.log(Date.now() + " ~ rejecct e = " + e);
		process.exit();
	}
}

go();

