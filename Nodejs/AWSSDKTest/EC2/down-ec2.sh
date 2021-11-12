#!/bin/bash

node ec2-manager.js stop

sleep 30

node ec2-manager.js stop

# To automatically start Docker and Containerd on boot for other distros, use the commands below:
# sudo systemctl enable docker.service
# sudo systemctl enable containerd.service
