import { Status } from '../models/enums/status';
import { TasksService } from '../services/tasksService';
import { Request, Response } from 'express';

export class TasksController {
    constructor(private readonly taskService: TasksService) {
        this.taskService = new TasksService();
    }

    createTask = async (req: Request, res: Response) => {
        try {
            const task: TaskDTO | undefined = await this.taskService.create(req.body);
            res.status(201).json(task);
        } catch(error: any) {
            res.status(400).json(error.message);
        }
    }

    updateTask = async (req: Request, res: Response) => {
        try {
            const task = await this.taskService.update(req.body, Number(req.params.id));
            res.status(200).json(task);
        } catch(error: any) {
            res.status(400).json(error.message);
        }
    }

    deleteTask = async (req: Request, res: Response) => {
        const id: number = Number(req.params.id);
        try {
            const tarefaDeletada: TaskDTO = await this.taskService.delete(id);
            res.status(200).json(tarefaDeletada)
        } catch(error: any) {
            res.status(400).json(error.message);
        }
    }

    listTasksByStatus = async (req: Request, res: Response) => {
        const {status} = req.params;

        if(Status[status as keyof typeof Status] === undefined) {
            res.status(400).json(`'${status}' não é um parametro permitido`);
        }else {
            const tasks: TaskDTO[] = await this.taskService.retriveByStatus(status);
            res.status(200).json(tasks);
        }

    }
}