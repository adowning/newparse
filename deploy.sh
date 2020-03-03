!#/bin/bash

echo 'Starting deploy script'

echo 'stashing git'
git stash

echo 'pulling..'
git pull 

echo 'installing'
yarn 

yarn build

echo 'starting server'
pm2 start dist/server

echo 'bye'
pm2 monit
