var FS = require('fs'),
    Q = require('q'),
    request = require('request');

function getResults(pathToFile) {   
    return Q.nfcall(FS.readFile, pathToFile, "utf-8")
    .then(function(tmpPrefix) {
        console.log('tmpPrefix = ', tmpPrefix);
        var options = { headers: {'User-Agent': 'MyAgent'} }; // github requires user agent string
        return [Q.nfcall(request, 'http://www.google.com', options),
                Q.nfcall(request, 'http://www.baidu.com', options)];
    })
    .spread(function(collaboratorsRes, commitsRes) {        
        return [collaboratorsRes[1], commitsRes[1]];  // return the response body
    })
    .fail(function(err) {
        console.error(err)
        return err;
    });
}

// actual call
// w.txt: www
getResults('w.txt').then(function(responses) {
    // do something with the responses
  console.log('responses[0] = ', responses[0]);
  console.log('\n ************************************************* ');
  console.log(' ************************************************* ');
  console.log(' ************************************************* \n');
  console.log('responses[1] = ', responses[1]);
});
