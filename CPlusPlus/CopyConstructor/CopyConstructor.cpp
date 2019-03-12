#include <iostream>
using namespace std;

class A
{
	private:
		int value;

	public:
		A(int n) { value = n; }

		// compile error: copy constructor must pass its first argument by reference
		// A(A other) { value = other.value; }
		A(const A& other) { value = other.value; }

		void Print() { cout << value << endl; }	
};

int main(int argc, char* argv[])
{
	A a = 10;
	A b = a;

	cout << "b.Print() = ";
	b.Print();

	return 0;
}

