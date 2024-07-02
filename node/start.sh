#!/bin/bash

# Executa o npm install
npm install

# Executa o dockerize com o node
dockerize -wait tcp://db:3306 -timeout 120s node index.js
