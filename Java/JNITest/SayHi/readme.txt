https://www.protechtraining.com/content/java_fundamentals_tutorial-_java_native_interface_jni


16.2. JNI Components

javah - JDK tool that builds C-style header files from a given Java class that includes native methods
Adapts Java method signatures to native function prototypes

jni.h - C/C++ header file included with the JDK that maps Java types to their native counterparts
javah automatically includes this file in the application header files


16.3. JNI Development (Java)

Create a Java class with native method(s): public native void sayHi(String who, int times);
Load the library which implements the method: System.loadLibrary("HelloImpl");
Invoke the native method from Java

For example, our Java code could look like this:
package com.marakana.jniexamples;

public class Hello {
  public native void sayHi(String who, int times); //1

  static { System.loadLibrary("HelloImpl"); } //2

  public static void main (String[] args) {
    Hello hello = new Hello();
    hello.sayHi(args[0], Integer.parseInt(args[1])); //3
  }
}

1,3: The method sayHi will be implemented in C/C++ in separate file(s), which will be compiled into a library.
2: The library filename will be called libHelloImpl.so (on Unix), HelloImpl.dll (on Windows) and libHelloImpl.jnilib (Mac OSX), but when loaded in Java, the library has to be loaded as HelloImpl.


16.4. JNI Development (C)

We use the JDK javah utility to generate the header file package_name_classname.h with a function prototype for the sayHi method: javac -d ./classes/ ./src/com/marakana/jniexamples/Hello.java Then in the classes directory run: javah -jni com.marakana.jniexamples.Hello to generate the header file com_marakana_jniexamples_Hello.h
We then create com_marakana_jniexamples_Hello.c to implement the Java_com_marakana_jniexamples_Hello_sayHi function
The file com_marakana_jniexamples_Hello.h looks like:
...
#include <jni.h>
...
JNIEXPORT void JNICALL Java_com_marakana_jniexamples_Hello_sayHi
  (JNIEnv *, jobject, jstring, jint);
...

The file Hello.c looks like:
#include <stdio.h>
#include "com_marakana_jniexamples_Hello.h"

JNIEXPORT void JNICALL Java_com_marakana_jniexamples_Hello_sayHi(JNIEnv *env, jobject obj, jstring who, jint times) {
  jint i;
  jboolean iscopy;
  const char *name;
  name = (*env)->GetStringUTFChars(env, who, &iscopy);
  for (i = 0; i < times; i++) {
    printf("Hello %s\n", name);
  }
}


16.5. JNI Development (Compile)

We are now ready to compile our program and run it

The compilation is system-dependent
This will create libHelloImpl.so, HelloImpl.dll, libHelloImpl.jnilib (depending on the O/S)

Set LD_LIBRARY_PATH to point to the directory where the compiled library is stored
Run your Java application
For example, to compile com_marakana_jniexamples_Hello.c in the "classes" directory (if your .h file and .c file are there) on Linux do:
gcc -o libHelloImpl.so -lc -shared \
    -I/usr/local/jdk1.6.0_03/include \
    -I/usr/local/jdk1.6.0_03/include/linux com_marakana_jniexamples_Hello.c

On Mac OSX :
gcc -o libHelloImpl.jnilib -lc -shared \
    -I/System/Library/Frameworks/JavaVM.framework/Headers com_marakana_jniexamples_Hello.c
Then set the LD_LIBRARY_PATH to the current working directory:

export LD_LIBRARY_PATH=.

Finally, run your application in the directory where your compiled classes are stored ("classes" for example):
java com.marakana.jniexamples.Hello Student 5
Hello Student
Hello Student
Hello Student
Hello Student
Hello Student

[Note]	Note
Common mistakes resulting in java.lang.UnsatisfiedLinkError usually come from incorrect naming of the shared library (O/S-dependent), the library not being in the search path, or wrong library being loaded by Java code.

