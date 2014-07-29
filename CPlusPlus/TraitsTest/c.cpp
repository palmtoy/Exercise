#include <iostream>

template <typename T>
class TypeTraits;

template <>
class TypeTraits<char>{
  public:
    typedef int ReturnType;
};

template <>
class TypeTraits<short>{
  public:
    typedef int ReturnType;
};

template <>
class TypeTraits<int>{
  public:
    typedef int ReturnType;
};

template <>
class TypeTraits<float>{
  public:
    typedef double ReturnType;
};

  template <typename T, typename Traits>
typename Traits::ReturnType average(T const* begin, T const* end)
{
  typedef typename Traits::ReturnType ReturnType;
  ReturnType total = ReturnType();
  int count = 0;
  while (begin != end){
    total += * begin;
    ++begin;
    ++count;
  }
  std::cout << "total = " << total << std::endl;
  std::cout << "count = " << count << std::endl;
  return total/count;
}

int main(){
  int numbers[] = {1, 2, 3, 4, 5};
  int len = sizeof(numbers) / sizeof(int);
  std::cout << average<int, TypeTraits<int> >(&numbers[0], &numbers[len]) << std::endl << "\n";

  char characters[] = "traits";
  len = sizeof(characters) / sizeof(char);
  std::cout << average<char, TypeTraits<char> >(&characters[0], &characters[len]) << std::endl << "\n";
}

