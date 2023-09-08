import { TasksService } from '../services/tasksService';
import { Request, Response } from 'express';

export class TasksController {
    taskService: TasksService;

    constructor() {
        this.taskService = new TasksService();
    }

    createTask = async (req: Request, res: Response) => {
        console.log("recebi requisição para criar tarefa")
        let task: TaskDTO = await this.taskService.create(req.body)
        res.status(200).json(task);
    }

    listTasksByStatus = async (req: Request, res: Response) => {
        console.log("recebi requisição para recuperar tarefas", )
        let status: string = req.params.status;
        let tasks: TaskDTO[] = await this.taskService.retriveByStatus(status);
        res.status(200).json(tasks);
    }
}