#!/bin/bash

mkdir -p /tmp/mongodb_dump
rm -rf /tmp/mongodb_dump/*

# array
PF_ARRAY=(performance_devices performance_gpus performance_profiles performance_rules performance_scenes performance_version)

for COLL_NAME in "${PF_ARRAY[@]}"
do
	/opt/mongo/current/bin/mongodump -h admin.staging.gods.sparx.io:27017 -d gam_staging -c $COLL_NAME -o /tmp/mongodb_dump
done

