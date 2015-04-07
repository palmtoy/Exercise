using System;

namespace HelloWorld
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			MyPrint("Tom");
		}

		public static void MyPrint (string name)
		{
			string tmpStr = string.Format("{0}", 999);
			Console.WriteLine (tmpStr);
		}
	}
}
