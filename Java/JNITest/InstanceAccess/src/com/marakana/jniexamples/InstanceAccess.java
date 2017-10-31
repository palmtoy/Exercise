/*
	javac -d ./classes/ ./src/com/marakana/jniexamples/InstanceAccess.java
	javah -jni com.marakana.jniexamples.InstanceAccess (in the classes directory run this cmd to generate the header file: com_marakana_jniexamples_InstanceAccess.h)
	javap -s -p com.marakana.jniexamples.InstanceAccess (in the classes directory run this cmd to get the signature of a method)
	java com.marakana.jniexamples.InstanceAccess (in the classes directory run this cmd)
*/


package com.marakana.jniexamples;

public class InstanceAccess {
	public String name;

	public void setName(String name) {
		this.name = name;
	}

	// Native method
	public native void propertyAccess();
	public native void methodAccess();

	public static void main(String args[]) {
		InstanceAccess instanceAccessor = new InstanceAccess();
		// Set the initial value of the name property
		instanceAccessor.setName("Jack");
		System.out.println("Java: value of name = \"" + instanceAccessor.name + "\"");
		// Call the propetyAccess() method
		System.out.println("Java: calling propertyAccess() method...");
		instanceAccessor.propertyAccess();
		// Value of name after calling the propertyAccess() method
		System.out.println("Java: value of name after calling propertyAccess() = \"" + instanceAccessor.name + "\"");
		// Call the methodAccess() method
		System.out.println("Java: calling methodAccess() method...");
		instanceAccessor.methodAccess();
		System.out.println("Java: value of name after calling methodAccess() = \"" + instanceAccessor.name + "\"");
	}

	// Load library
	static {
		System.loadLibrary("InstanceAccess");
	}
}

