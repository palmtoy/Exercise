#include <iostream>

template <typename T>
T average(T const* begin, T const* end)
{
  T total = T();
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
  std::cout << average(&numbers[0], &numbers[len]) << std::endl << "\n";

  float fNumbers[] = {1, 2, 3, 4, 5, 6, 7, 8, 9.5};
  int fLen = sizeof(fNumbers) / sizeof(float);
  std::cout << average(&fNumbers[0], &fNumbers[fLen]) << std::endl << "\n";

  char characters[] = "traits";
  int cLen = sizeof(characters) / sizeof(char);
  std::cout << static_cast<int>(average(&characters[0], &characters[cLen])) << std::endl << "\n";
}

