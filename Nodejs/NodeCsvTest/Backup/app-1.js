// node samples/string.js
var csv = require('csv');

csv()
.from.string(
  '#Welcome\n"1","2","3","4"\n"a","b","c","d"',
  {comment: '#'} )
  .to.array( function(data){
    console.log(data)
  } );
// [ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ]

