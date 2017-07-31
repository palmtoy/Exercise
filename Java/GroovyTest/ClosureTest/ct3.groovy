class Example {
	static void main(String[] args) {
		def clos = {println "Hello World"};
		clos.call();

		Date date = new Date();
		def clos2 = {param -> println date.toString() + " ~ Foo ${param}"};
		clos2.call("Bar");

		// Here ‘it’ is a keyword in Groovy
		def clos3 = {println "Hi ${it}"};
		clos3.call("Baby ~");

		def str1 = "What's";
		def clos4 = {param -> println "${str1} ${param}"}
		clos4.call("Up");
		// We are now changing the value of the String str1 which is referenced in the closure
		str1 = "Stand";
		clos4.call("Up");
	}
}

