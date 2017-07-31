class Example {
	static void main(String[] args) {
		def lst = [1, 2, 3, 4];
		def newlst = [];
		newlst = lst.collect {element -> return element * element}
		println("newlst is: " + newlst);
		println("origin lst is: " + lst);
	} 
}

