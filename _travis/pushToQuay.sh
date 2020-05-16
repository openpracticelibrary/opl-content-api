#!/bin/bash

echo "$QUAY_PASSWORD" | docker login -u "$QUAY_USERNAME" --password-stdin
docker push quay.io/openpracticelibrary/opl-content-api

