import { TasksService,  } from "../services/tasksService"
import { DataSource } from 'typeorm';
//import { myTestDataSource } from "./test_db/testHelper";
import { myDataSource } from "../db/app-data-source";

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

const expectedTaskOutput = {
  id: "1",
  name: "tarefa tttttt",
  description: "Tarefa simples",
  date: new Date(),
  status: "aFazer",
};

describe("TaskService", ()=> {
  describe("Create a Task", ()=> {
    it("should return a Task with an Id", async () => {
      let response = await taskService.create(valideInputTask);
      expect(response).toEqual(expectedTaskOutput);
    })
  })
})