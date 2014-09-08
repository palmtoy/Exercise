var express = require('express');
var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
// app.set('view engine', 'html');

app.get('/', function(req, res){
  var now = new Date();
  res.render('index.ejs', {
    title: "EJS Test",
    message: now + " ~ Hello World! by: Will Lee"
  });
});

var port = 8089;
app.listen(port);

console.log('Express app started on port %d ...', port);

