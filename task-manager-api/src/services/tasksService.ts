import { Repository } from "typeorm";
import { Task } from "../models/task";
import { myDataSource } from "../db/app-data-source";

export class TasksService {
    taskRepository: Repository<Task>;
    constructor() {
        this.taskRepository = myDataSource.getRepository(Task);
    }

    create(body: Task) {
        throw new Error('Method not implemented.');
    }

}