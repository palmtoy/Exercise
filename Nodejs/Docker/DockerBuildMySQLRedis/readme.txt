docker build -t node-httpsrv:v1.0.7 .

docker run -d -p 33000:3000 --name=node-httpsrv node-httpsrv:v1.0.7

docker exec -it node-httpsrv sh

