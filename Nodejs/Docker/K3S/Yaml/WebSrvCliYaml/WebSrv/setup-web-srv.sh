#!/usr/bin/bash

sudo kubectl apply -f ns-web-srv.yaml
sudo kubectl apply -f cli-deploy.yaml
sudo kubectl apply -f web-deploy.yaml
sudo kubectl apply -f srv-deploy.yaml
sudo kubectl apply -f ingress-web-srv.yaml

# sudo kubectl get -n web-srv-ns deploy -o yaml | linkerd inject - | sudo kubectl apply -f -

