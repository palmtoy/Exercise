class Example { 
	def static Display(clo) {
		// This time the $param parameter gets replaced by the string "Inner"         
		clo.call("Inner");
	} 

	static void main(String[] args) {
		def str1 = "Hello";
		def clos = { param -> println "${str1} ${param}" }
		clos.call("World");

		// We are now changing the value of the String str1 which is referenced in the closure
		str1 = "Welcome";
		clos.call("World");

		// Passing our closure to a method
		str1 = "Hi";
		Example.Display(clos);

		println ""
		def lst = [11, 12, 13, 14];
		lst.each {println "A ~ The item value is: " + it}
		println ""
		lst.each {println "B ~ The item value is: ${it}"}

		println ""
		def mp = ["TopicName": "Maps", "TopicDescription": "Methods in Maps"]             
		mp.each {println it}
		println ""
		mp.each {println "${it.key} maps to: ${it.value}"}
	}
}

