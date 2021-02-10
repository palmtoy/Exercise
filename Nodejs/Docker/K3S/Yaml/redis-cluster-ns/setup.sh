#!/bin/bash

sudo kubectl apply -f create-redis-cluster-ns.yaml

sudo kubectl create configmap redis-conf --from-file=redis.conf -n redis-cluster-ns

sudo kubectl apply -f boot-redis-cluster-ns.yaml

