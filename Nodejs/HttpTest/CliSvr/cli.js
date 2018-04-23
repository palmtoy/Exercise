//node.js
var  HTTPClient = require('httpclient');
var options = {
  hostname: 'localhost',
  path: '/',
  port: 8080,
  secure: false,
  method: 'GET',
  headers: {
    'x-powered-by': 'HTTPClient.js'
  }
};

console.log('options', options);

/*
 * Example 1 - node style
 */
var example1 = new HTTPClient(options);
example1.request('/echo?name=palmtoy', function(err, res, body) {
    console.log('Example 1');
    console.log('error:', err);
    console.log('response:', res);
    console.log('body:', body);
    console.log('body(str):', body.toString());
    });
