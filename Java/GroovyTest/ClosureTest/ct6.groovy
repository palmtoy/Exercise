class Example {
	static void main(String[] args) {
		def lst = [1, 2, 3, 4];
		def value;

		println lst
		println "A: find ..."
		value = lst.find {element -> element > 2}
		println(value);

		println "\nB: find ..."
		value = lst.find {element -> element > 5}
		println(value);

		println "\nfindAll ..."
		value = lst.findAll {element -> element > 2}
		value.each {println it}

		println "\nany ... Is there any value above 2?"
		value = lst.any {element -> element > 2}
		println(value);

		println "\nany ... Is there any value above 4?"
		value = lst.any {element -> element > 4}
		println(value); 

		println "\nevery ... Are all value above 2?"
		value = lst.every {element -> element > 2}
		println(value);

		println "\nevery ... Are all value above 4?"
		value = lst.every {element -> element > 4}
		println(value);  

		def largelst = [4, 5, 6];
		println "\n" + largelst
		println "every ... Are all value above 2?"
		value = largelst.every {element -> element > 2}
		println(value);
	} 
}

