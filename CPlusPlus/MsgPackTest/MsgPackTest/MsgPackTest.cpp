#include <msgpack.hpp>
#include <string>
#include <iostream>
#include <sstream>

void foo()
{
	msgpack::type::tuple<int, bool, std::string> src(1, true, "example");

	// serialize the object into the buffer.
	// any classes that implements write(const char*,size_t) can be a buffer.
	std::stringstream buffer;
	msgpack::pack(buffer, src);

	// send the buffer ...
	buffer.seekg(0);

	// deserialize the buffer into msgpack::object instance.
	std::string str(buffer.str());

	msgpack::object_handle oh =
		msgpack::unpack(str.data(), str.size());

	// deserialized object is valid during the msgpack::object_handle instance is alive.
	msgpack::object deserialized = oh.get();

	// msgpack::object supports ostream.
	std::cout << deserialized << std::endl << std::endl;

	// convert msgpack::object instance into the original type.
	// if the type is mismatched, it throws msgpack::type_error exception.
	msgpack::type::tuple<int, bool, std::string> dst;
	deserialized.convert(dst);

	return;
}

void bar()
{
	// serializes this object.
	std::vector<std::string> vec;
	vec.push_back("Hello");
	vec.push_back("MessagePack");

	// serialize it into simple buffer.
	msgpack::sbuffer sbuf;
	msgpack::pack(sbuf, vec);

	// deserialized it.
	msgpack::object_handle oh = msgpack::unpack(sbuf.data(), sbuf.size());

	// print the deserialized object.
	msgpack::object obj = oh.get();
	std::cout << obj << std::endl << std::endl;  //=> ["Hello", "MessagePack"]

	// convert it into statically typed object.
	std::vector<std::string> rvec;
	obj.convert(rvec);

	return;
}

void my_map()
{
	std::map<char,int> mymap;

	// first insert function version (single parameter):
	mymap.insert ( std::pair<char,int>('a',100) );
	mymap.insert ( std::pair<char,int>('z',200) );

	// showing contents:
	std::map<char,int>::iterator it;
	std::cout << "mymap contains:\n";
	for (it=mymap.begin(); it!=mymap.end(); ++it)
	{
		std::cout << it->first << " => " << it->second << '\n';
	}

	// serialize it into simple buffer.
	msgpack::sbuffer sbuf;
	msgpack::pack(sbuf, mymap);

	// deserialized it.
	msgpack::object_handle oh = msgpack::unpack(sbuf.data(), sbuf.size());

	// print the deserialized object.
	msgpack::object obj = oh.get();

	// convert it into statically typed object.
	std::vector<std::string> rvec;
	std::map<char,int> rmap;
	obj.convert(rmap);

	std::cout << "---------------\nrmap contains:\n";
	for (it=rmap.begin(); it!=rmap.end(); ++it)
	{
		std::cout << it->first << " => " << it->second << '\n';
	}

	std::cout << std::endl;
	return;
}



void unpacker_print(msgpack::sbuffer& buffer)
{
	// deserializes these objects using msgpack::unpacker.
	msgpack::unpacker pac;

	// feeds the buffer.
	pac.reserve_buffer(buffer.size());
	memcpy(pac.buffer(), buffer.data(), buffer.size());
	pac.buffer_consumed(buffer.size());

	// now starts streaming deserialized.
	msgpack::object_handle oh;
	while(pac.next(oh)) {
		std::cout << oh.get() << std::endl;
	}
	std::cout << std::endl;
}

void streaming()
{
	// serializes multiple objects using msgpack::packer.
	msgpack::sbuffer buffer;

	msgpack::packer<msgpack::sbuffer> pk(&buffer);
	pk.pack(std::string("Log message ... 1"));
	pk.pack(std::string("Log message ... 2"));
	pk.pack(std::string("Log message ... 3"));

	unpacker_print(buffer);
}

void streaming2map()
{
	// serializes multiple objects into one message containing an array using msgpack::packer.
	msgpack::sbuffer buffer;
	msgpack::packer<msgpack::sbuffer> pk(&buffer);
	pk.pack_array(3);
	pk.pack(std::string("Log message ... X"));
	pk.pack(std::string("Log message ... Y"));
	pk.pack(std::string("Log message ... Z"));
	unpacker_print(buffer);

	// serializes multiple objects into one message containing a map using msgpack::packer.
	msgpack::sbuffer buffer2;
	msgpack::packer<msgpack::sbuffer> pk2(&buffer2);
	pk2.pack_map(2);
	pk2.pack(std::string("x"));
	pk2.pack(3);
	pk2.pack(std::string("y"));
	pk2.pack(3.4321);
	unpacker_print(buffer2);
}

class MyClass {
private:
	std::string m_str;
	std::vector<int> m_vec;
public:
	MSGPACK_DEFINE(m_str, m_vec);
	void set_str(std::string& str) { m_str = str; }
	void add_int(int n) { m_vec.push_back(n); }
};

void user_defined_class()
{
	std::vector<MyClass> vec;

	// add some elements into vec...
	MyClass myObj;
	myObj.set_str(std::string("Hi baby ~"));
	myObj.add_int(789);
	vec.push_back(myObj);

	// you can serialize MyClass directly
	msgpack::sbuffer sbuf;
	msgpack::pack(sbuf, vec);

	msgpack::object_handle oh =
		msgpack::unpack(sbuf.data(), sbuf.size());

	msgpack::object obj = oh.get();

	// you can convert object to MyClass directly
	std::vector<MyClass> rvec;
	obj.convert(rvec);

	std::cout << obj << std::endl << std::endl;
}

int main(void)
{
	foo();

	bar();

	my_map();

	streaming();

	streaming2map();

	user_defined_class();

	getchar();
	return 0;
}
