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

	spreadsheet.receive(function(err, rows, info) {
		if (err) {
			throw err;
		}

		console.dir(rows);
		console.dir(info);
	});
});
