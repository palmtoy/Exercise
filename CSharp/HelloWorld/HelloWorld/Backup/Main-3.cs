using System;

namespace HelloWorld
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			MyPrint("baby");
		}

		public static void MyPrint (string name)
		{
			string str = string.Format("What's up {0} ?", name);
			Console.WriteLine (str);
		}
	}
}
