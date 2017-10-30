/*
	On Mac OSX :
	gcc -o libArrayReader.jnilib -lc -shared -I/System/Library/Frameworks/JavaVM.framework/Headers com_marakana_jniexamples_ArrayReader.c
*/

#include <stdio.h>
#include "com_marakana_jniexamples_ArrayReader.h"

JNIEXPORT jint JNICALL Java_com_marakana_jniexamples_ArrayReader_sumArray(JNIEnv *env, jclass class, jintArray array) {
	jint *native_array;
	jint i, result = 0;
	native_array = (*env)->GetIntArrayElements(env, array, NULL);
	if (native_array == NULL) {
		return 0;
	}
	for (i = 0; i < 10; i++) {
		result += native_array[i];
	}
	(*env)->ReleaseIntArrayElements(env, array, native_array, 0);
	return result;
}

