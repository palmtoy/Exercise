# How to build ?
# 1: $ cmake .
# 2: $ make
cmake_minimum_required(VERSION 3.23.0)
project(CJSON_TEST)
set(LIB_SRC cJSON.c)
set(APP_SRC main.c)
add_library(libcjson ${LIB_SRC})
set_target_properties(libcjson PROPERTIES OUTPUT_NAME "cjson")
add_executable(cjtest ${APP_SRC})
target_link_libraries(cjtest libcjson)
