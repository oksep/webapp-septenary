import {Router} from "express";
import * as StatisticsController from "../controller/statistics";

const statisticsRouter: Router = Router();

// TODO
// statisticsRouter.post("/article/views", StatisticsController.overview);

statisticsRouter.get("/overview", StatisticsController.overview);

export {statisticsRouter};