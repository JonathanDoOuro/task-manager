import { Router } from "express";
import { TasksRoute } from "./routes/tasksRoute";

const taskRoute = new TasksRoute();

const router = Router();

router.use(taskRoute.router)

export {router}