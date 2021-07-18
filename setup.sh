#!/bin/bash

echo ">>> Setup started"
echo ">>> Installing requirements"
sudo apt update
sudo apt-get install -y git
    
echo ">>> Cloning the repo"
sudo mkdir -p ./dm/front && sudo mkdir -p ./dm/back \
    && sudo chown $USER:$USER ./dm/front \
    && sudo chown $USER:$USER ./dm/back \
    && git clone https://github.com/isandroazedo/device-management-web.git ./dm/front \
    && git clone https://github.com/isandroazedo/device-management-api.git ./dm/back \
    && cd ./dm/back \
    && make db-image \
    && make base-image \
    && make image \
    && cd ../front \
    && make base-image \
    && make image
