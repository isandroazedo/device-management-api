#!/bin/bash

echo ">>> Setup started"
echo ">>> Installing requirements"

sudo apt update && curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash - \
    && sudo apt install -y nodejs nginx mysql-server \
    && sudo mysql_secure_installation && && systemctl status mysql.service \
    && sudo ufw app list && sudo ufw allow 'Nginx HTTP' \
    && sudo cp dm /etc/nginx/sites-available/ \
    && sudo ln -s /etc/nginx/sites-available/dm /etc/nginx/sites-enabled/ \
    && sudo nginx -t && sudo systemctl restart nginx \
    && sudo npm install typescript -g \
    && sudo mysql.server start \
    && sudo mysql -u root -e "SET PASSWORD FOR root@'127.0.0.1' = PASSWORD('pwd1212');"

sudo npm install npm@latest -g && sudo npm install -g @angular/cli && sudo npm install --global Yarn

sudo mkdir -p ~/git/dm/front && sudo mkdir -p ~/git/dm/back \
    && git clone https://github.com/isandroazedo/device-management-web.git ~/git/dm/front \
    && git clone https://github.com/isandroazedo/device-management-api.git ~/git/dm/back

echo "127.0.0.1  dm" >> /etc/hosts

cd ~/git/dm/web
export NODE_ENV=development && sudo yarn install && sudo yarn build && sudo cp -R config build/config/ \
    && sudo cp -R dist/device-management-web/*.* /var/www/dm/html/ && sudo systemctl restart nginx

cd ~/git/dm/back
export NODE_ENV=development && sudo yarn install && sudo yarn build && sudo cp -R config build/config \
    && npx sequelize-cli db:migrate && nohup node build/index.js > output.log
