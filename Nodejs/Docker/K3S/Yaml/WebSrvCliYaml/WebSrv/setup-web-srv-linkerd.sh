#!/usr/bin/bash

linkerd inject cli-deploy.yaml > cli-deploy-injected.yaml
linkerd inject web-deploy.yaml > web-deploy-injected.yaml
linkerd inject srv-deploy.yaml > srv-deploy-injected.yaml

sudo kubectl apply -f ns-web-srv.yaml
sudo kubectl apply -f cli-deploy-injected.yaml
sudo kubectl apply -f web-deploy-injected.yaml
sudo kubectl apply -f srv-deploy-injected.yaml
sudo kubectl apply -f ingress-web-srv.yaml

# sudo kubectl get -n web-srv-ns deploy -o yaml | linkerd inject - | sudo kubectl apply -f -

