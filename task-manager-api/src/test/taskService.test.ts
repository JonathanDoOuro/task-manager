import { TasksService } from '../services/tasksService';
import { MustHaveAllFields } from '../exceptions/mustHaveFields';
import { Repository } from 'typeorm';

jest.mock('../db/app-data-source', () => ({
    getRepository: jest.fn(),
}));

jest.mock('typeorm', () => ({
    Repository: jest.fn(),
}));

describe('TasksService', () => {
  let tasksService: TasksService;
  let taskRepository: any;

  beforeEach(() => {
    taskRepository = {
      save: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
    };

    // Mock the Repository constructor to return the taskRepository
    (Repository as jest.Mock).mockImplementation(() => taskRepository);

    // Create an instance of TasksService
    tasksService = new TasksService();
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  it('should create a task', async () => {
    const taskDto: TaskDTO = { /* Create a valid task DTO */ };
    const expectedTask = { /* Create an expected task object */ };

    // Mock the save method to return the expected task
    taskRepository.save.mockResolvedValue(expectedTask);

    const result = await tasksService.create(taskDto);

    expect(result).toEqual(expectedTask);
    expect(taskRepository.save).toHaveBeenCalledWith(expect.any(Object));
  });

  // Write more test cases for other methods in TasksService

  it('should throw MustHaveAllFields when validating a task with missing fields', () => {
    const invalidTaskDto: TaskDTO = { /* Create an invalid task DTO with missing fields */ };

    expect(() => tasksService.validateTask(invalidTaskDto)).toThrow(MustHaveAllFields);
  });
});
