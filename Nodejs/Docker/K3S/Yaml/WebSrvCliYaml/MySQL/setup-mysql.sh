#!/usr/bin/bash

sudo kubectl apply -f create-ns-mysql.yaml
sudo kubectl apply -f init-mysql.yaml

