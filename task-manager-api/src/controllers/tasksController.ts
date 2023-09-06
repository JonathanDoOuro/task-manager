import { TasksService } from '../services/tasksService';
import { Request, Response } from 'express';

export class TasksController {
    taskService: TasksService;
    constructor() {
        this.taskService = new TasksService();
    }

    createTask(req: Request, res: Response) {
        this.taskService.create(req.body)
    }
}