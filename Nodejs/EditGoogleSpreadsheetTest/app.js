var Spreadsheet = require('edit-google-spreadsheet');

Spreadsheet.load({
	debug: true,
	spreadsheetId: '1b0u48zSjGrZ8ePe7Sa-3QuT9Mty4nG6WPslY180GpJc',
	worksheetId: 'od6',
	// spreadsheetName: 'HelloWorld',
	// worksheetName: 'MyComputers',

	oauth : {
		email: '376314952996-6tuuafb8cftvn9330g6gjukdsfksgdeq@developer.gserviceaccount.com',
		keyFile: './mykeyforgoogle.pem'
	}
}, function sheetReady(err, spreadsheet) {
	if (err) {
		throw err;
	}

	spreadsheet.add(
		{ 4: { 1: 'work', 2: 'work', 3: 'enjoy' } }
	);

	spreadsheet.add({
		5: {
			1: { name: "a", val: 100 }, // '66' though tagged as "a" 
			2: { name: "b", val: 200 }, // '88' though tagged as "b" 
			3: "={{ a }}+{{ b }}"      // forumla adding row5,col1 with row5,col2 => '=A5+B5' 
		}
	});

	spreadsheet.send(function(err) {
		if (err) {
			throw err;
		}
		console.log("Updated the 4th/5th lines ...");

		spreadsheet.receive(function(err, rows, info) {
			if (err) {
				throw err;
			}
			console.dir(rows);
			console.dir(info);
		});
	});
});

