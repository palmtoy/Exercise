var fs = require('fs');
// obtain a JWT-enabled version of request 
var request = require('google-oauth-jwt').requestWithJWT();

request({
	url: 'https://docs.google.com/spreadsheets/d/1b0u48zSjGrZ8ePe7Sa-3QuT9Mty4nG6WPslY180GpJc',
	jwt: {
		// use the email address of the service account, as seen in the API console 
		email: '376314952996-6tuuafb8cftvn9330g6gjukdsfksgdeq@developer.gserviceaccount.com',
		// use the PEM file we generated from the downloaded key 
		keyFile: './mykeyforgoogle.pem',
		// specify the scopes you wish to access - each application has different scopes 
		scopes: ['https://www.googleapis.com/auth/drive.readonly']
	}
}, function (err, res, body) {
	fs.writeFileSync('./index.html', body);
});

