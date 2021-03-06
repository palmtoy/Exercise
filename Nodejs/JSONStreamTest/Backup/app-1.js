var request = require('request')
  , JSONStream = require('JSONStream')
  , es = require('event-stream');


/*

request('http://pomelo3.server.163.org:8080/data.json')
  .pipe(JSONStream.parse('rows.*'))
  .pipe(es.mapSync(function (data) {
    console.log(data)
    return data
  }));

*/


// var parser = JSONStream.parse(['rows', true])
var parser = JSONStream.parse(['rows', true, 'doc'])
  , req = request({url: 'http://pomelo3.server.163.org:8080/data.json'})
  , logger = es.mapSync(function (data) {
      console.log(data)
      return data
    });

req
  .pipe(parser)
  .pipe(logger);
