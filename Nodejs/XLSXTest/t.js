/// <summary>
/// 将指定的自然数转换为26进制表示。映射关系：[1-26] -> [A-Z]。
/// </summary>
/// <param name="n">自然数（如果无效，则返回空字符串）。</param>
/// <returns>26进制表示。</returns>
function toNumberBase26(n){
  var s = '';
  while(n > 0) {
    var m = n % 26;
    if(m === 0) {
      m = 26;
    }
    s = String.fromCharCode(m + 64) + s;
    n = Math.floor((n - m) / 26);
  }
  return s;
} 

/// <summary>
/// 将指定的26进制表示转换为自然数。映射关系：[A-Z] -> [1-26]。
/// </summary>
/// <param name="s">26进制表示（如果无效，则返回0）。</param>
/// <returns>自然数。</returns>
function toNumberBase10(s){
  if(s.length === 0) {
    return 0; 
  }

  s = s.toUpperCase();

  var n = 0;
  for(var i = s.length - 1, j = 1; i >= 0; i--, j *= 26){
    var c = s.charCodeAt(i)
    if (c < 'A'.charCodeAt(0) || c > 'Z'.charCodeAt(0)) {
      return 0;
    }
    n += (c - 64) * j;
  }
  return n;
}


var numbersL = [ 1, 10, 26, 27, 256, 702, 703 ];
numbersL.forEach(function(n) {
  var s = toNumberBase26(n);
  console.log(n + "\t" + s + "\t" + toNumberBase10(s));
})

console.log('\n\n');

numbersL = [ 'A', 'Z', 'AA', 'AZ', 'BA', 'AAA', 'AAZ' ];
numbersL.forEach(function(c) {
  var n = toNumberBase10(c);
  console.log(c + "\t" + n + "\t" + toNumberBase26(n));
})

