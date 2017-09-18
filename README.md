# Septenary

![Blog website](https://github.com/Ryfthink/webapp-septenary/raw/master/art/impress.gif)

## Development server

    npm start

## Production

    1. npm run build
    2. scp -i ~/.ssh/aliyun_septenary_rsa -r dist root@IP:/root/home/workspace
    3. scp -i ~/.ssh/aliyun_septenary_rsa node_modules.zip root@106.14.195.38:/root/home/workspace
    3. scp -i ~/.ssh/aliyun_septenary_rsa server/db/init-db root@106.14.195.38:/root/home/workspace
    4. connectseptenary
    5. unzip node_modules.zip
    6. systemctl start mongod
    7. sh init-db
    8. pm2 start dist/server/bin/www.js -i 0 --name "blog-server"
