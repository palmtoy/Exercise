var fs = require('fs');
var GoogleOAuthJWT = require('google-oauth-jwt');
var GoogleSpreadsheet = require("google-spreadsheet");

// With auth -- read + write
var privateKey = fs.readFileSync('./id_rsa_for_google');
var oauth = {
	email: '376314952996-682nse4maq7opmjop6294mn4fhtuab8r@developer.gserviceaccount.com',
	key: privateKey,
	scopes: ['https://spreadsheets.google.com/feeds']
};

GoogleOAuthJWT.authenticate(oauth, function(err, token) {
	console.log('token =', token);
	var sheetId = '1b0u48zSjGrZ8ePe7Sa-3QuT9Mty4nG6WPslY180GpJc';
	var my_sheet = new GoogleSpreadsheet(sheetId, {type : 'Bearer', value: token});

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
		});
	});
});

