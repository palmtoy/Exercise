#!/bin/bash

sudo kubectl apply -f create-redis-ns.yaml

sudo kubectl create configmap redis-conf --from-file=redis.conf -n redis-ns

sudo kubectl apply -f boot-redis-ns.yaml

