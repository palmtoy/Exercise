#!/bin/bash

VER=v1.0.0

npm install

docker rmi lzg-express-cli:$VER
cp Dockerfile-cli Dockerfile
docker build -t lzg-express-cli:$VER .


docker rmi lzg-express-web:$VER
cp Dockerfile-web Dockerfile
docker build -t lzg-express-web:$VER .


docker rmi lzg-express-srv:$VER
cp Dockerfile-srv Dockerfile
docker build -t lzg-express-srv:$VER .


# docker run -d -p 3001:3001 --name=lzg-express-web lzg-express-web:$VER
# docker run -d -p 3003:3003 --name=lzg-express-srv lzg-express-srv:$VER

# curl -X POST http://localhost:3001/foo -d '{"name":"palmtoy"}' -H "Content-Type:application/json" && echo

