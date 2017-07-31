import groovy.transform.*


def outerFunction () {
	def counter = 1;
	return {
		println "Counter = " + counter++
	}
}

def myClosure = outerFunction()
myClosure();  // executes 1
myClosure();  // executes 2
myClosure();  // executes 3
myClosure();  // executes 4
myClosure();  // executes 5
myClosure();  // executes 6

