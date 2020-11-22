docker build -t node-httpsrv:v1.0.5 .

docker run -d -p 33000:3000 --name=node-httpsrv node-httpsrv:v1.0.5

docker exec -it node-httpsrv sh

