import express, { Router } from 'express';
import { TasksController } from '../controllers/tasksController';

export class TasksRoute {
    router: Router = express.Router();
    taskController: TasksController = new TasksController();

    constructor() {
        this.router.post("/task", this.taskController.createTask)
        this.router.get("/task/:status", this.taskController.listTasksByStatus)
        this.router.delete("/task/:id", this.taskController.deleteTask)
        this.router.put("/task/:id", this.taskController.updateTask)
    }
}