import * as express from "express";
import {json, urlencoded} from "body-parser";
import * as path from "path";
import * as compression from "compression";

import {userRouter} from "./routes/user";
import {authRouter} from "./routes/auth";
import {articleRouter} from "./routes/article";
import {adminRouter} from "./routes/admin";
import {qiniuRouter} from "./routes/qiniu";

import * as Auth from "./auth/auth";
import Result from "./controller/result";

const app: express.Application = express();

app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({extended: true}));

app.use(Auth.initial());

// api routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/article', articleRouter);
app.use('/api/admin', adminRouter);
app.use('/api/qiniu', qiniuRouter);

// if (app.get('env') === 'production') {

// in production mode run application from dist folder
app.use(express.static(path.join(__dirname, '/../client')));
// }

app.get('/index', (request, response) => {
    response.json({message: 'App works!!!'});
});

// issue: http://stackoverflow.com/questions/34847972/how-to-handle-angular2-route-path-in-nodejs
// 404 catch
app.all('*', (req: any, res: any) => {
    console.log(`[TRACE] Server 404 request: ${req.originalUrl}`);
    res.status(200).sendFile(path.join(__dirname, '/../client/index.html'));
});

// catch 404 and forward to error handler
app.use(function (req: express.Request, res: express.Response, next) {
    let err = new Error('Not Found');
    next(err);
});

// production error handler
// no stacktrace leaked to user
app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {

    res.status(err.status || 500);
    res.json(Result.failed(err.message));
});

export {app}
