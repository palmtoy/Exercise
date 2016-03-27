require('cld').detect('北京欢迎你', function(err, result) {
	console.log('0 ~ ', result);
});

////////////////////////////////////////////////////////////////

require('cld').detect('This is a language recognition example', function(err, result) {
	console.log('1 ~ ', result);
});

////////////////////////////////////////////////////////////////

var text    = 'Това е пример за разпознаване на Български език';
var options = {
  isHTML       : false,
  languageHint : 'BULGARIAN',
  encodingHint : 'ISO_8859_5',
  tldHint      : 'bg',
  httpHint     : 'bg'
};
 
require('cld').detect(text, options, function(err, result) {
  console.log('2 ~ ', result);
});

