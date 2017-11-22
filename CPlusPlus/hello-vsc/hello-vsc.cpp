#include <iostream>

int main(int argc, const char *argv[])
{
  int tmpV = 9527;
  tmpV++;
  std::cout << "tmpV =" << tmpV << std::endl;
  for(int tmpI = 0; tmpI < 3; tmpI++) {
    std::cout << "tmpI =" << tmpI << std::endl;
  }
  std::cout << "hello Visual Studio Code! :)" << '\n';
  return 0;
}