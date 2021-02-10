#!/bin/bash

sudo kubectl patch configmap tcp-services -n ingress-nginx-ns --patch '{"data":{"3306":"kube-public/mysql-service:3306"}}'

sudo kubectl patch configmap tcp-services -n ingress-nginx-ns --patch '{"data":{"6379":"redis-cluster-ns/redis-access-service-a:6379"}}'

sudo kubectl patch configmap tcp-services -n ingress-nginx-ns --patch '{"data":{"6380":"redis-cluster-ns/redis-access-service-b:6379"}}'

