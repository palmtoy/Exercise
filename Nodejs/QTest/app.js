var FS = require('fs'),
    Q = require('q'),
    request = require('request');

function getResults(pathToFile) {   
    return Q.nfcall(FS.readFile, pathToFile, "utf-8")
    .then(function(content) {
        console.log('content = ', content);
        var options = { headers: {'User-Agent': 'MyAgent'} }; // github requires user agent string
        return [Q.nfcall(request, 'http://'+content+'.sina.com', options),
                // Q.nfcall(request, 'http://'+content+'.baidu.com', options)];
                Q.nfcall(request, 'http://www.sina.com', options)];
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
// www.txt: www
getResults('www.txt').then(function(responses) {
    // do something with the responses
  console.log('responses = ', responses);
});
