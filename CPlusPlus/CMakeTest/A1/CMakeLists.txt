project(HELLO)
set(SRC_LIST main.cpp)
add_executable(hello ${SRC_LIST})
message("PROJECT_SOURCE_DIR = " ${PROJECT_SOURCE_DIR})
