def range = 0..4
println range.class
assert range instanceof List

def coll = ["Groovy", "Java", "Ruby"]
println "\n" + coll.class
assert coll instanceof Collection
assert coll instanceof ArrayList

Collection<String> collX = new ArrayList<String>();
collX.add("GroovyX");
collX.add("JavaX");
collX.add("RubyX");
println "\n" + collX.class
println collX
