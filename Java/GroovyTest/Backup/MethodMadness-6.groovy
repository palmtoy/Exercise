def repeat(val, repeat=5){
	for(i in 0 ..<repeat){
		println i + " -> " + val
	}
}

repeat(new Date().toString() + " ~ Hello World!", 3)
repeat("Hello World", 2)
repeat("Goodbye sunshine", 4)
repeat("foo")

