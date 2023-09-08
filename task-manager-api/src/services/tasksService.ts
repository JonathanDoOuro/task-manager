import { Task } from "../models/task";
import { myDataSource } from "../db/app-data-source";
import { Repository } from "typeorm";
import { Status } from "../models/enums/status";

export class TasksService {
    taskRepository: Repository<Task>;

    constructor() {
        this.taskRepository = myDataSource.getRepository(Task);
    }

    create = async (task: Task) => {
        let novaTarefa = await this.taskRepository.save(this.jsonToTask(task));
        return this.getDTOfromTask(novaTarefa);
    }

    retriveByStatus = async (status: String): Promise<TaskDTO[]> => {
        // let tasks = await this.taskRepository.find({
        //     where: {
        //         status: Status[status as keyof typeof Status],
        //     },
        // })
        let tasks = await this.taskRepository.find({
            where: {
                status: undefined,
            },
        })

        let tasksDto = tasks.map((task) => {
            return this.getDTOfromTask(task);
        })

        return tasksDto;
    }

    private jsonToTask(body: any): Task {
        let task = body as Task;
        task.status = Status[task.status]
        return task
    }

    private getDTOfromTask(task: Task): TaskDTO {
        let taskDto: TaskDTO = {
            ...task,
            status: task.status.toString(),
            date: task.date.toString()
        }
        return taskDto
    }

}