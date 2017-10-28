// gcc -o libHelloImpl.jnilib -lc -shared -I/System/Library/Frameworks/JavaVM.framework/Headers HelloWorld.c

#include <jni.h>
#include <stdio.h>
#include "HelloWorld.h"

JNIEXPORT void JNICALL

Java_HelloWorld_print(JNIEnv *env, jobject obj) {
  printf("Hello World!\n");
  return;
}
