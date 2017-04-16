def range = 0..4
println range.class
assert range instanceof List

def coll = ["Groovy", "Java", "Ruby"]
println "\n" + coll.class
assert coll instanceof Collection
assert coll instanceof ArrayList

