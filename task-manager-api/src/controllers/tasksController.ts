import { Status } from '../models/enums/status';
import { TasksService } from '../services/tasksService';
import { Request, Response } from 'express';

export class TasksController {
    taskService: TasksService;

    constructor() {
        this.taskService = new TasksService();
    }

    createTask = async (req: Request, res: Response) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
        console.log("recebi requisição para criar uma tarefa")
        try {
            let task: TaskDTO | undefined = await this.taskService.create(req.body);
            res.status(201).json(task);
        } catch(error: any) {
            res.status(400).json(error.message);
        }
    }

    updateTask = async (req: Request, res: Response) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
        console.log("recebi requisição para atualizar uma tarefa")
        try {
            let task: TaskDTO = await this.taskService.update(req.body, Number(req.params.id));
            res.status(200).json(task);
        } catch(error: any) {
            res.status(400).json(error.message);
        }
    }

    deleteTask = async (req: Request, res: Response) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
        console.log("recebi requisição para deletar uma tarefa")
        let id: number = Number(req.params.id);
        try {
            let tarefaDeletada: TaskDTO = await this.taskService.delete(id);
            res.status(200).json(tarefaDeletada)
        } catch(error: any) {
            res.status(400).json(error.message);
        }
    }

    listTasksByStatus = async (req: Request, res: Response) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
        console.log("recebi requisição para recuperar tarefas", )

        let status: string = req.params.status;

        if(Status[status as keyof typeof Status] == undefined) {
            res.status(400).json(`'${status}' não é um parametro permitido`);
        }else {
            let tasks: TaskDTO[] = await this.taskService.retriveByStatus(status);
            res.status(200).json(tasks);
        }

    }
}