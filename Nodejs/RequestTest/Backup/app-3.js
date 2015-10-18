var request = require('request');

request.post({url: 'http://localhost:8086/pullCodeAndUpdateSvr', form: {title:'Mr.', username:'palmtoy'}}, function(err, httpRes, body){
  if (!err && httpRes.statusCode === 200) {
    // console.log(httpRes);
    console.log(httpRes.statusCode);
    console.log(body);
  }
});

