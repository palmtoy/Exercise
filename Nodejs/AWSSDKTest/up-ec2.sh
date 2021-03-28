#!/bin/bash

node ec2-manager.js start

sleep 3

node ec2-manager.js start

# To automatically start Docker and Containerd on boot for other distros, use the commands below:
# sudo systemctl enable docker.service
# sudo systemctl enable containerd.service
