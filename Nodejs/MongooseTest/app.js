var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function() {

	console.log("We're connected to mongodb!");

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

	var Kitten = mongoose.model('Kitten', kittySchema);

	var silence = new Kitten({ name: 'Silence' });
	silence.save(function (err, s) {
		if (err) return console.error(err);
		console.log(s.name + ' saved.');
	});

	var fluffy = new Kitten({ name: 'fluffy' });

	fluffy.save(function (err, fluffy) {
		if (err) return console.error(err);
		fluffy.speak(); // "Meow name is fluffy"

		Kitten.find(function (err, kittens) {
			if (err) return console.error(err);
			console.log(kittens);
			console.log();

			Kitten.find({ name: /^fluff/ }, function (err, kittens) {
				if (err) return console.error(err);
				console.log(kittens);
				process.exit();
			});
		});
	});

});

