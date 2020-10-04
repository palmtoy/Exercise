docker build -t node-httpsrv .

docker run -d -p 33000:3000 node-httpsrv:latest
