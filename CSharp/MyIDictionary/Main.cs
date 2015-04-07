using System;
using System.Collections.Generic;

namespace MyIDictionary
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			// Dictionary implements IDictionary.
			IDictionary<int, string> dict = new Dictionary<int, string>();
			int k = 9;
			dict[k] = "Hello World";
			WriteKeyA(dict, k);
		}

		static void WriteKeyA(IDictionary<int, string> d, int k)
		{
			// Use instance through IDictionary interface.
			Console.WriteLine(d[k]);
		}
	}
}
