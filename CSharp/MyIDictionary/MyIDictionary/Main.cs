using System;
using System.Collections.Generic;

namespace MyIDictionary
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			// Dictionary implements IDictionary.
			Dictionary<string, string> dict = new Dictionary<string, string>();
			dict["k"] = "Hello World";
			WriteKeyA(dict, "k");
		}

		static void WriteKeyA(IDictionary<string, string> d, string k)
		{
			// Use instance through IDictionary interface.
			Console.WriteLine(d[k]);
		}
	}
}
