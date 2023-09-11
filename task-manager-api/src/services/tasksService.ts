import { Task } from "../models/task";
import { myDataSource } from "../db/app-data-source";
import { Repository } from "typeorm";
import { Status } from "../models/enums/status";
import { MustHaveAllFields } from "../exceptions/mustHaveFields";

export class TasksService {
    taskRepository: Repository<Task>;

    constructor() {
        this.taskRepository = myDataSource.getRepository(Task);
    }

    create = async (task: TaskDTO) => {
        this.validateTask(task);
        let novaTarefa = await this.taskRepository.save(this.dtoToTask(task));
        return this.getDTOfromTask(novaTarefa);
    }

    delete = async (id: number) => {
        let task: Task | null = await this.taskRepository.findOneBy({
            id: id
        })
        console.log("task:", task, "id:", id)
        if(task != null) {
            await this.taskRepository.remove(task);
            task.id = id;
            return this.getDTOfromTask(task);
        }else {
            throw new Error(`Tarefa com 'id: ${id}' não existe`);
        }
        
    }

    update = async (task: TaskDTO, id: number) => {
        this.validateTask(task);
        let taskRetrived: Task | null = await this.taskRepository.findOneBy({
            id: id
        })
        if(taskRetrived != null){
            await this.taskRepository.update(id, {
                name: task.name,
                description: task.description,
                date: task.date,
                status: Status[task.status as keyof typeof Status]
            })
            return {...task,
                    id: id,
                    date: task.date.toString()}
        }else {
            throw new Error(`Tarefa com 'id: ${id}' não existe`);
        }
    }

    retriveByStatus = async (status: String): Promise<TaskDTO[]> => {
        let tasks: Task[] = await this.taskRepository.find({
            where: {
                status: Status[status as keyof typeof Status],
            },
        })
        
        let tasksDto: TaskDTO[] = tasks.map((task) => {
            return this.getDTOfromTask(task);
        })
        return tasksDto;
    }

    private dtoToTask(body: any): Task {
        let task = body as Task;
        task.status = Status[task.status]
        return task
    }

    private getDTOfromTask(task: Task): TaskDTO {
        let taskDto: TaskDTO = {
            ...task,
            id: String(task.id),
            status: task.status.toString(),
            date: task.date
        }
        return taskDto
    }

    private validateTask(task: TaskDTO) {
        if(task.date == null) {
            throw new MustHaveAllFields("date must not be null");
        }
        if(task.description == null) {
            throw new MustHaveAllFields("description must not be null");
        }
        if(task.name == null) {
            throw new MustHaveAllFields("name must not be null");
        }
        if(task.status == null || !(task.status in Status) ) {
            throw new MustHaveAllFields("status must not be null ['naoIniciada','aFazer', 'fazendo', 'feito']");
        }
    }

}