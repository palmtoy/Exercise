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
			Console.WriteLine ("What's up {0} ?", name);
		}
	}
}
