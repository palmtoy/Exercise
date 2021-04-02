#!/bin/bash

sudo kubectl apply -f create-redis-ns.yaml

sudo kubectl create configmap redis-conf --from-file=redis.conf -n redis-ns

sudo kubectl apply -f boot-redis-ns.yaml

sudo kubectl patch configmap tcp-services -n ingress-nginx-ns --patch '{"data":{"6379":"redis-ns/redis-service:6379"}}'

