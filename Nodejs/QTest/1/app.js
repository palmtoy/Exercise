var FS = require('fs'),
    Q = require('q'),
    request = require('request');

function getResults(pathToFile) {   
    return Q.nfcall(FS.readFile, pathToFile, "utf-8")
    .then(function(tmpPrefix) {
        tmpPrefix = tmpPrefix.slice(0, -1);
        var options = { headers: {'User-Agent': 'MyAgent'} }; // github requires user agent string

        var urlG = 'https://' + tmpPrefix + '.google.com/';
        var urlB = 'http://' + tmpPrefix + '.baidu.com';

        console.log('urlG = ', urlG);
        console.log('urlB = ', urlB, '\n\n');

        return [Q.nfcall(request, urlG, options),
                Q.nfcall(request, urlB, options)];
    })
    .spread(function(googleRet, baiduRet) {
        return [googleRet[1], baiduRet[1]];  // return the response body
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
  console.log('\n\n ************************************************* ');
  console.log(' ************************************************* ');
  console.log(' ************************************************* \n\n');
  console.log('responses[1] = ', responses[1]);
});
