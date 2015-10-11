var GoogleSpreadsheet = require("google-spreadsheet");

// spreadsheet key is the long id in the sheets URL 
var my_sheet = new GoogleSpreadsheet('1b0u48zSjGrZ8ePe7Sa-3QuT9Mty4nG6WPslY180GpJc');

// With auth -- read + write 
var creds = require('./mykeyforgoogle.json');

my_sheet.useServiceAccountAuth(creds, function(err){
	// getInfo returns info about the sheet and an array or "worksheet" objects 
	my_sheet.getInfo( function( err, sheet_info ){
		console.log( sheet_info.title + ' is loaded.\n' );
		console.dir(sheet_info);
		console.log('\n');

		// use worksheet object if you want to stop using the # in your calls 
		var sheet1 = sheet_info.worksheets[0];
		sheet1.getRows( function( err, rows ){
			console.dir(rows);
		});
	});
});

