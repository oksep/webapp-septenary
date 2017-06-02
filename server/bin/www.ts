#!/usr/bin/env node
/**
 * Module dependencies.
 */
import {connectDB} from "../db/dbconnection";
import * as config from "../config";
import * as http from "http";
import {app} from "../app";


/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || config.serverPort);
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

connectDB(() => {
    console.log('数据库连接成功...');
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val): boolean | number {
    const normalizedPort = parseInt(val, 10);
    if (isNaN(normalizedPort))  return val;
    if (normalizedPort >= 0) return normalizedPort;
    return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server 'listening' event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
