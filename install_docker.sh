#!/bin/bash

echo ">>> Installing docker"
sudo apt update
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release apt-transport-https ca-certificates software-properties-common
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
sudo apt update
sudo apt-cache policy docker-ce
sudo apt install -y nodejs docker-ce
sudo usermod -aG docker ${USER}
su - ${USER}
