/// <summary>
/// 将指定的自然数转换为26进制表示。映射关系：[1-26] ->[A-Z]。
/// </summary>
/// <param name="n">自然数（如果无效，则返回空字符串）。</param>
/// <returns>26进制表示。</returns>
public static string ToNumberBase26(int n){
  string s = string.Empty;
  while (n > 0){
    int m = n % 26;
    if (m == 0) m = 26;
    s = (char)(m + 64) + s;
    n = (n - m) / 26;
  }
  return s;
} 

/// <summary>
/// 将指定的26进制表示转换为自然数。映射关系：[A-Z] ->[1-26]。
/// </summary>
/// <param name="s">26进制表示（如果无效，则返回0）。</param>
/// <returns>自然数。</returns>
public static int ToNumberBase10(string s){
  if (string.IsNullOrEmpty(s)) return 0; 
  int n = 0;
  for (int i = s.Length - 1, j = 1; i >= 0; i--, j *= 26){
    char c = Char.ToUpper(s[i]);
    if (c < 'A' || c > 'Z') return 0;
    n += ((int)c - 64) * j;
  }
  return n;
}

static void Main(string[] args){
  int[] numbers = { 1, 10, 26, 27, 256, 702, 703 };
  foreach (int n in numbers){
    string s = ToNumberBase26(n);
    Console.WriteLine(n + "\t" + s + "\t" + ToNumberBase10(s));
  }
  Console.ReadLine();
}
