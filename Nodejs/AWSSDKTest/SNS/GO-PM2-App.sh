#!/bin/bash

mkdir -p ./logs

pm2 start pm2.config-sns.json

