// POST

var request = require('request');

request.post(
  'http://localhost:3000/wow',
  { key: 'value' },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }
);

