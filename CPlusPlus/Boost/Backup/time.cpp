#include <iostream>
#include <boost/timer.hpp>

int main(int argc, char *argv[]){
  boost::timer t;

  std::cout << "Hello, Boost." << std::endl;
  std::cout << "Max timespan: " << t.elapsed_max() / 3600 << " h" << std::endl;

  return 0;
}

