server {
        listen 80;
        listen [::]:80;

        root /var/www/dm/html;
        index index.html index.htm index.nginx-debian.html;

        server_name dm;

        location / {
                try_files $uri $uri/ =404;
        }
}
