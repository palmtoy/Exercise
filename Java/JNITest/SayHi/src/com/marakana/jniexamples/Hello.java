/*
	javac -d ./classes/ ./src/com/marakana/jniexamples/Hello.java
	javah -jni com.marakana.jniexamples.Hello (in the classes directory run this cmd to generate the header file: com_marakana_jniexamples_Hello.h)
*/

package com.marakana.jniexamples;

public class Hello {
	public native void sayHi(String who, int times); //1

	/*
		The library filename will be called libHelloImpl.so(on Unix), HelloImpl.dll (on Windows) and libHelloImpl.jnilib (Mac OSX);
		but when loaded in Java, the library has to be loaded as HelloImpl
	*/
	static { System.loadLibrary("HelloImpl"); } //2

	public static void main (String[] args) {
		Hello hello = new Hello();
		hello.sayHi(args[0], Integer.parseInt(args[1])); //3
	}
}

