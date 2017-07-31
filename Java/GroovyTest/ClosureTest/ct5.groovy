class Example { 
	static void main(String[] args) {
		def mp = ["TopicName": "Maps", "TopicDescription": "Methods in Maps"]             
		mp.each({println it})
		println ""
		mp.each({println "${it.key} maps to: ${it.value}"})

		println ""
		def lst = [1, 2, 3, 4];
		lst.each {println it}
		println ""
		println("The list will only display those numbers which are divisible by 2 ...")
		lst.each {num -> if(num % 2 == 0) println num}
	}
}

