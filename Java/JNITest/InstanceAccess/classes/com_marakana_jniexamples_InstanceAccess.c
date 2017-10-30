/*
  On Mac OSX :
  gcc -o libInstanceAccess.jnilib -lc -shared -I/System/Library/Frameworks/JavaVM.framework/Headers com_marakana_jniexamples_InstanceAccess.c
*/

#include <stdio.h>
#include "com_marakana_jniexamples_InstanceAccess.h"


JNIEXPORT void JNICALL Java_com_marakana_jniexamples_InstanceAccess_propertyAccess(JNIEnv *env, jobject object){
	jfieldID fieldId;
	jstring jstr;
	const char *cString;

	/* Getting a reference to object class */
	jclass class = (*env)->GetObjectClass(env, object);

	/* Getting the field id in the class */
	fieldId = (*env)->GetFieldID(env, class, "name", "Ljava/lang/String;");
	if (fieldId == NULL) {
		return; /* Error while getting field id */
	}

	/* Getting a jstring */
	jstr = (*env)->GetObjectField(env, object, fieldId);

	/* From that jstring we are getting a C string: char* */
	cString = (*env)->GetStringUTFChars(env, jstr, NULL);
	if (cString == NULL) {
		return; /* Out of memory */
	}
	printf("C: value of name before property modification = \"%s\"\n", cString);
	(*env)->ReleaseStringUTFChars(env, jstr, cString);

	/* Creating a new string containing the new name */
	jstr = (*env)->NewStringUTF(env, "Brian");
	if (jstr == NULL) {
		return; /* Out of memory */
	}
	/* Overwrite the value of the name property */
	(*env)->SetObjectField(env, object, fieldId, jstr);
}


JNIEXPORT void JNICALL Java_com_marakana_jniexamples_InstanceAccess_methodAccess(JNIEnv *env, jobject object){
	jclass class = (*env)->GetObjectClass(env, object);
	jmethodID methodId = (*env)->GetMethodID(env, class, "setName", "(Ljava/lang/String;)V");
	jstring jstr;
	if (methodId == NULL) {
		return; /* method not found */
	}
	/* Creating a new string containing the new name */
	jstr = (*env)->NewStringUTF(env, "Nick");
	(*env)->CallVoidMethod(env, object, methodId, jstr);
}

