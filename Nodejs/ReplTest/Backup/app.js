/**
 * To connect: $ curl -sSNT. localhost:8000

curl repl> process.platform
'darwin'

curl repl> process.arch
'x64'

curl repl> process.cwd()
'/Users/will'

curl repl> path
{ resolve: [Function],
  normalize: [Function],
  join: [Function],
  relative: [Function],
  dirname: [Function],
  basename: [Function],
  extname: [Function],
  _makeLong: [Function] }

curl repl> ^C
 */
 
var http = require('http')
  , repl = require('repl')
  , buf0 = new Buffer([0])
 
var server = http.createServer(function (req, res) {
  res.setHeader('content-type', 'multipart/octet-stream')
 
  res.write('Welcome to the Fun House\r\n')
  repl.start({
      prompt: 'curl repl> '
    , input: req
    , output: res
    , terminal: false
    , useColors: true
    , useGlobal: false
  })
 
  // log
  console.log(req.headers['user-agent'])
 
  // hack to thread stdin and stdout
  // simultaneously in curl's single thread
  var iv = setInterval(function () {
    res.write(buf0)
  }, 100)
 
  res.connection.on('end', function () {
    clearInterval(iv)
  })
})
server.listen(8000)
