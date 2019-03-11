#include <iostream>

template <typename T> class MakeSealed
{
	friend T;

	private:
		MakeSealed() {};
		~MakeSealed() {};
};

class SealedClass: virtual public MakeSealed<SealedClass>
{
	public:
		SealedClass() {};
		~SealedClass() {};
};

/*
class Try: public SealedClass
{
	public:
		Try() {};
		~Try() {};
};
*/

int main(int argc, char* argv[])
{
	SealedClass scObj;
	// Try tryObj;

	std::cout << "ok";

	return 0;
}

