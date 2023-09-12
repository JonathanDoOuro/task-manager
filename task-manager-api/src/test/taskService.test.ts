import { TasksService,  } from "../services/tasksService"
import { DataSource } from 'typeorm';
import { myDataSource } from "../db/app-data-source";
import { MustHaveAllFields } from "../exceptions/mustHaveFields";

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

const valideInputTask = {
  id: "1",
  name: "tarefa tttttt",
  description: "Tarefa simples",
  date: new Date(),
  status: "aFazer"
};

const invalideInputTask = {
  id: "1",
  name: "tarefa tttttt",
  description: "undefined",
  date: new Date(),
  status: "completo"
};

const updatedInputTask = {
  id: "1",
  name: "tarefa atualizada",
  description: "A é uma tarefa atualizada",
  date: new Date(),
  status: "feito",
};

describe("TaskService", ()=> {
  describe("Criar uma tarefa", ()=> {
    it("should return a Task with an Id", async () => {
      const response = await taskService.create(valideInputTask);
      expect(response).toHaveProperty("id");
      expect(response.name).toBe(valideInputTask.name);
    });

    it("deverialançar uma exceção", async () => {
      try {
        await taskService.create(invalideInputTask);
      } catch (error: any) {
        expect(error).toBeInstanceOf(MustHaveAllFields);
      }
    });
  })

  describe("Atualizar uma tarefa", () => {
    it("Deveria atualizar a tarefa e retornar ela", async () => {
      const createdTask = await taskService.create(valideInputTask);
      const updatedTask = await taskService.update(updatedInputTask, parseInt(createdTask.id));
      expect(updatedTask).toHaveProperty("id");
      expect(updatedTask.name).toBe(updatedInputTask.name);
      expect(updatedTask.description).toBe(updatedInputTask.description);
      expect(updatedTask.status).toBe(updatedInputTask.status);
    });

    it("deveria lançar uma exceção ao atualizar uma tarefa que não existe", async () => {
      try {
        await taskService.update(updatedInputTask, 90);
      } catch (error: any) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toContain("Tarefa com 'id: 90' não existe");
      }
    });
  });

})