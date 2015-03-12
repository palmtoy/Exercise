using System;

namespace HelloWorld
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			// MyPrint("Hello World");
			MyPrint();
		}

		public static void MyPrint (string str = "What's up?")
		{
			Console.WriteLine (str);
		}
	}
}
