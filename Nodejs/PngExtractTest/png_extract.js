//useage: $ node png_extract.js image.vpk

var fs = require('fs');
var file = process.argv[2];

function _BufferIndexOf(src_buf, sub_buf, start_index)
{
  if(!Buffer.isBuffer(src_buf) || !Buffer.isBuffer(sub_buf)) return -1;
  var src_len = src_buf.length, sub_len = sub_buf.length, idx = start_index-0;
  if(isNaN(idx) || idx < 0) idx = 0; // default
  if(src_len==0 || sub_len==0 || idx + sub_len > src_len) return -1;

  if(sub_len == 1) {
    for(var i = idx, c = sub_buf[0]; i<src_len; i++)
      if(src_buf[i] == c) return i;
    return -1;
  }

  if(idx + sub_len == src_len) {
    var i = idx + sub_len - 1;
    var j =       sub_len - 1;
    for(; j>-1 && src_buf[i] == sub_buf[j]; j--, i-- );
    return (j==-1) ? idx : -1;
  }

  var skip = new Array(256);    
  for(var i=0; i< 256;       i++) skip[i] = sub_len;
  for(var i=0; i< sub_len-1; i++) skip[ sub_buf[i] ] = sub_len - i - 1;

  for(var k = idx + sub_len - 1; k < src_len; k += skip[ src_buf[k] ]) {
    var i = k;
    var j = sub_len - 1;
    for(; j>-1 && src_buf[i] == sub_buf[j]; j--, i--); 
    if(j == -1) return i + 1;
  }
  return -1;
}

var data = fs.readFileSync(file);
var start_buf = new Buffer(5);
start_buf[0]=0x89;
start_buf[1]=0x50;
start_buf[2]=0x4e;
start_buf[3]=0x47;
start_buf[4]=0x0d;

var end_buf = new Buffer(5);
end_buf[0]=0x49;
end_buf[1]=0x45;
end_buf[2]=0x4e;
end_buf[3]=0x44;
end_buf[4]=0xae;

var flag = 0;
var fileno = 0;
var start = 0;

var len = data.length;
var pos = 0;

while(pos < len) {
  if(flag === 0) {
    pos = _BufferIndexOf(data, start_buf, pos);
    if (pos !== -1) {
      flag = 1;
      start = pos; 
      console.log('start update: ', pos);
      pos += 8; 
      continue;
    }
    process.exit(0);
  } else {
    pos = _BufferIndexOf(data, end_buf, pos);
    if(pos !== -1) {
      flag = 0;
      pos += 8;
      console.log('start: ', start, 'pos: ', pos);
      var buf = data.slice(start, pos);
      fileno ++;
      fs.writeFileSync('png'+fileno+'.png', buf);
    }
  }
}
