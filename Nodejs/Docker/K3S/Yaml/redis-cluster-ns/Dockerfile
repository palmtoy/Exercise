# 使用官方提供的Python开发镜像作为基础镜像
FROM python:2.7-slim

RUN echo "deb https://mirror.tuna.tsinghua.edu.cn/debian buster main" > /etc/apt/sources.list
RUN echo "deb https://mirror.tuna.tsinghua.edu.cn/debian-security buster/updates main" >> /etc/apt/sources.list
RUN echo "deb https://mirror.tuna.tsinghua.edu.cn/debian buster-updates main" >> /etc/apt/sources.list

RUN apt-get update
RUN apt-get install -y build-essential wget redis-tools dnsutils

RUN pip install redis-trib==0.6.2
# RUN easy_install redis-trib==0.6.2

# REF -> https://pypi.org/project/redis-trib (version: 0.6.2)

# docker build -t python_redis-trib:2.7-slim .
#
# redis-trib.py create \
#   `dig +short redis-stateful-set-a-0.redis-cluster-service-a.redis-cluster-ns.svc.cluster.local`:6379 \
#   `dig +short redis-stateful-set-b-0.redis-cluster-service-b.redis-cluster-ns.svc.cluster.local`:6379
# 
# redis-trib.py create 192.168.0.116:6379
