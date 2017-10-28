// using cmd to generated 'HelloWorld.h': `javah -jni HelloWorld`

class HelloWorld {
	static {
		System.loadLibrary("HelloImpl");
	}

	private native void print();

	public static void main(String[] args) {
		new HelloWorld().print();
	}
}

