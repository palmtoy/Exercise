/*
	To compile com_marakana_jniexamples_Hello.c in the "classes" directory (if your .h file and .c file are there)

	On Linux do:
	gcc -o libHelloImpl.so -lc -shared \
			-I/usr/local/jdk1.8.0_121/include \
			-I/usr/local/jdk1.8.0_121/include/linux com_marakana_jniexamples_Hello.c

	On Mac OSX :
	gcc -o libHelloImpl.jnilib -lc -shared \
			-I/System/Library/Frameworks/JavaVM.framework/Headers com_marakana_jniexamples_Hello.c
*/

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

