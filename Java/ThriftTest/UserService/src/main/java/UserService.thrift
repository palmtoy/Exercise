/*
    cd ./src/main/java; rm -rf ./com; thrift -r --gen java UserService.thrift;  mv ./gen-java/* ./;  rm -rf ./gen-java;
*/

namespace java com.pwrd

struct User {
    1: i64 id
    2: string name
    3: i64 timestamp
    4: bool vip
}

service UserService {
    User getById(1: i64 id)
}

