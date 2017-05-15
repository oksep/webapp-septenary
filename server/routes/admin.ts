import {Router} from "express";
// import * as Auth from "../auth/auth";
import {test} from "../exec";
import {aggregateTags} from "../controller/articles";

const adminRouter: Router = Router();

adminRouter.get('/destroy', (res, rep) => {
    aggregateTags(null,null);
    // test();
    rep.json('TODO');
});

export {adminRouter};