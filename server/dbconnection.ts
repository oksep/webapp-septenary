import {DBConfig} from "./config";
import * as mongoose from "mongoose";
(<any>mongoose).Promise = global.Promise;

function connectDB(onDBConnected: Function) {
    const connection = mongoose.connect(DBConfig.host, {server: {socketOptions: {keepAlive: 1}}}).connection;
    connection
        .on('error', onError)
        .on('disconnected', connectDB)
        .once('open', onDBConnected);
}

function onError(error) {
    console.error('数据库连接错误...', error);
    process.exit(1);
}

export default mongoose

export {
    connectDB
}