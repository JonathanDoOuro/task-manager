import { TasksService,  } from "../services/tasksService"
import { DataSource } from 'typeorm';
import { myDataSource } from "../db/app-data-source";
import { MustHaveAllFields } from "../exceptions/mustHaveFields";
import { Status } from "../models/enums/status";

let taskService: TasksService;

beforeAll(async (): Promise<DataSource> => {
  taskService = new TasksService();
  await myDataSource.initialize()
  .then(() => {
      console.log("TEST Data Source inicializado")
  })
  .catch((err: any) => {
      console.error("TESTE - Erro durante inicialização:", err)
  })

  return myDataSource;
});

afterAll(async () => await myDataSource.dropDatabase());

const inputTarefaValida = {
  id: "1",
  name: "tarefa tttttt",
  description: "Tarefa simples",
  date: new Date(),
  status: "aFazer"
};

const inputTarefaInvalida = {
  id: "1",
  name: "tarefa tttttt",
  description: "undefined",
  date: new Date(),
  status: "completo"
};

const inputTarefaUpdate = {
  id: "1",
  name: "tarefa atualizada",
  description: "A é uma tarefa atualizada",
  date: new Date(),
  status: "feito",
};

describe("TaskService", ()=> {
  describe("Criar uma tarefa", ()=> {
    it("should return a Task with an Id", async () => {
      const response = await taskService.create(inputTarefaValida);
      expect(response).toHaveProperty("id");
      expect(response.description).toBe(inputTarefaValida.description);
    });

    it("deverialançar uma exceção", async () => {
      try {
        await taskService.create(inputTarefaInvalida);
      } catch (error: any) {
        expect(error).toBeInstanceOf(MustHaveAllFields);
      }
    });
  })

  describe("Atualizar uma tarefa", () => {
    it("Deveria atualizar a tarefa e retornar ela", async () => {
      const createdTask = await taskService.create(inputTarefaValida);
      const updatedTask = await taskService.update(inputTarefaUpdate, parseInt(createdTask.id));
      expect(updatedTask).toHaveProperty("id");
      expect(updatedTask.name).toBe(inputTarefaUpdate.name);
      expect(updatedTask.description).toBe(inputTarefaUpdate.description);
      expect(updatedTask.status).toBe(inputTarefaUpdate.status);
    });

    it("deveria lançar uma exceção ao atualizar uma tarefa que não existe", async () => {
      try {
        await taskService.update(inputTarefaUpdate, 90);
      } catch (error: any) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain("Tarefa com 'id: 90' não existe");
      }
    });
  });

  describe("Recuperar tarefas por Status", () => {
    it("deveria retornar tarefas pelo status passado", async () => {
      await taskService.create(inputTarefaValida);
      await taskService.create(inputTarefaUpdate);

      const tasks: TaskDTO[] = await taskService.retriveByStatus("feito");

      expect(tasks.length).toBe(1);
      expect(tasks[0].status).toBe(Status.feito);
    });

    it("retorna lista vazia quando não há tarefas com o status passado", async () => {
      const tasks: TaskDTO[] = await taskService.retriveByStatus("naoIniciada");
      expect(tasks).toEqual([]);
    });
  });

})