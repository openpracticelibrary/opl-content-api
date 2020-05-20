#!/bin/bash

jq '.dependencies |= .+ { "@apollo/federation": "^0.15.0" }' node_modules/strapi-plugin-graphql/package.json > tmp.package.json && mv tmp.package.json node_modules/strapi-plugin-graphql/package.json

