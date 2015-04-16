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
			string str = string.Format("combat[\"{0}\"]teamInitData", name);
			Console.WriteLine (str);
		}
	}
}
