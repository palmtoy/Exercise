/*
	mkdir -p ./bin
	javac Reloader.java
	java Reloader
	javac -d ./bin MyFoo.java
*/

import java.io.IOException;
import java.io.*;
import java.lang.reflect.Field;


public class Reloader extends ClassLoader {
	public static void main(String[] args) throws Exception {
		do {
			Object foo = new Reloader().loadClass("MyFoo").newInstance();
			System.out.println("LOADED: " + foo); // Overload MyFoo#toString() for effect
			System.out.println("Press <ENTER> when MyFoo.class has changed");

			Class<?> clazz = foo.getClass();
			Field coffeeField = clazz.getField("coffee");
			System.out.println("foo.coffee = " + coffeeField.get(foo));

			Field teaField = null;
			try {
				teaField = clazz.getField("tea");
			} catch (NoSuchFieldException ex) {
				// field doesn't exist
				System.out.println("1 ~ teaField = " + teaField);
			} catch (SecurityException ex) {
				// no access to field
				System.out.println("2 ~ teaField = " + teaField);
			}
		
			if(teaField != null) {
				System.out.println("foo.tea = " + teaField.get(foo));
			}

			System.in.read();
		} while (true);
	}

	@Override
	public Class<?> loadClass(String s) {
		return findClass(s);
	}

	@Override
	public Class<?> findClass(String s) {
		try {
			byte[] bytes = loadClassData(s);
			return defineClass(s, bytes, 0, bytes.length);
		} catch (IOException ioe) {
			try {
				return super.loadClass(s);
			} catch (ClassNotFoundException ignore) { }
			ioe.printStackTrace(System.out);
			return null;
		}
	}

	private byte[] loadClassData(String className) throws IOException {
		File f = new File("bin/" + className.replaceAll("\\.", "/") + ".class");
		int size = (int) f.length();
		byte buff[] = new byte[size];
		FileInputStream fis = new FileInputStream(f);
		DataInputStream dis = new DataInputStream(fis);
		dis.readFully(buff);
		dis.close();
		return buff;
	}
}

