/*
	javac -d ./classes/ ./src/com/marakana/jniexamples/ArrayReader.java
	javah -jni com.marakana.jniexamples.ArrayReader (in the classes directory run this cmd to generate the header file: com_marakana_jniexamples_ArrayReader.h)
	java com.marakana.jniexamples.ArrayReader (in the classes directory run this cmd)
*/

package com.marakana.jniexamples;

public class ArrayReader {

	private static native int sumArray(int[] arr);

	public static void main(String[] args) {
		// Array declaration
		int arr[] = new int[10];
		// Fill the array
		for (int i = 0; i < 10; i++) {
			arr[i] = i;
		}
		ArrayReader reader = new ArrayReader();
		// Call native method
		int result = reader.sumArray(arr);
		System.out.println("The sum of every element in the array is " + Integer.toString(result));
	}
	static {
		System.loadLibrary("ArrayReader");
	}

}

