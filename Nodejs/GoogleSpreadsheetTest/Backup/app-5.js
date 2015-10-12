var fs = require('fs');
var GoogleSpreadsheet = require("google-spreadsheet");

// spreadsheet key is the long id in the sheets URL 
var my_sheet = new GoogleSpreadsheet('1b0u48zSjGrZ8ePe7Sa-3QuT9Mty4nG6WPslY180GpJc');

/*
	 my_sheet.getRows( 1, function(err, row_data){
	 console.log( 'Read published spreadsheet: pulled in '+ row_data.length + ' rows' );
	 console.log('row_data =>');
	 console.dir(row_data);
	 });
	 */

// With auth -- read + write
var privateKey = fs.readFileSync('./id_rsa_for_google');
var creds = {
	client_email: '376314952996-682nse4maq7opmjop6294mn4fhtuab8r@developer.gserviceaccount.com',
	private_key: privateKey
}

my_sheet.useServiceAccountAuth(creds, function(err){
	// getInfo returns info about the sheet and an array or "worksheet" objects 
	my_sheet.getInfo( function( err, sheet_info ){
		console.log( '\n' + sheet_info.title + ' is loaded.\n' );
		console.dir(sheet_info);

		// use worksheet object if you want to stop using the # in your calls 
		var sheet1 = sheet_info.worksheets[0];
		sheet1.getRows( function( err, rows ){
			console.log('\n');
			console.dir(rows[0]);
			rows[0].macosx = 'NetEase';
			rows[0].save(function() {
				my_sheet.getInfo( function( err, sheet_info ){
					var sheet1 = sheet_info.worksheets[0];
					sheet1.getRows( function( err, rows ){
						console.log('\n');
						console.dir(rows[0]);
					});
				});
			});
		}); //async and takes a callback
		// console.dir(rows);
	});
});

