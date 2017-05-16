# Septenary blog website

1.for development
```shell
npm start
```

2.for production
```shell
npm run build

# use pm2 to manage the service 
pm2 start ./dist/server/bin/www
```