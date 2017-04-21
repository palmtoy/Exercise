def repeat(val, repeat=5){
	for(i in 0 ..<repeat){
		println i + " -> " + val
	}
}

repeat(new Date().toString() + " ~ Hello World!", 3)

