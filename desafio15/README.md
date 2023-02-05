# Desafíos de NODEJS

## Desafío: Servidor con balance de carga


## Api Randoms
...
Inicio de puertos
pm2  start app.js --name="8082" --watch -i 3  -- -- 4001
pm2  start app.js --name="8083" --watch -i 3  -- -- 4002
pm2  start app.js --name="8084" --watch -i 3  -- -- 4003
pm2  start app.js --name="8085" --watch -i 3  -- -- 4004

Configuración Nginx.exe 
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream node_app {
        server localhost:4001;
        server localhost:4002;
        server localhost:4003;
        server localhost:4004;
    }

    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
        }
        location /api/randoms/ {
            proxy_pass http://node_app;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}