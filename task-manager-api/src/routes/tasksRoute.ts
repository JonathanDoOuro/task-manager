import express, { Router } from 'express';
import { TasksController } from '../controllers/tasksController';

export class TasksRoute {
    router: Router = express.Router();
    taskController: TasksController = new TasksController();

    constructor() {
        this.router.post("/task", this.taskController.createTask)
        this.router.get("/tasks/:status", this.taskController.listTasksByStatus)
    }
}