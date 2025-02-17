import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';

const mockTask = {
  title: 'Test Task',
  description: 'Test Desc',
  status: 'pending',
};

describe('TaskService', () => {
  let service: TaskService;
  let model: Model<Task>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getModelToken(Task.name),
          useValue: {
            create: jest.fn().mockResolvedValue(mockTask),
            find: jest.fn().mockResolvedValue([mockTask]),
            findById: jest.fn().mockResolvedValue(mockTask),
            findByIdAndUpdate: jest.fn().mockResolvedValue(mockTask),
            findByIdAndDelete: jest.fn().mockResolvedValue(mockTask),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    model = module.get<Model<Task>>(getModelToken(Task.name));
  });

  it('should create a task', async () => {
    const task = await service.create(mockTask);
    expect(task).toEqual(mockTask);
  });

  it('should fetch all tasks', async () => {
    const tasks = await service.findAll();
    expect(tasks).toEqual([mockTask]);
  });

  it('should fetch a task by ID', async () => {
    const task = await service.findOne('someId');
    expect(task).toEqual(mockTask);
  });

  it('should update a task', async () => {
    const updatedTask = await service.update('someId', {
      title: 'Updated Task',
    });
    expect(updatedTask).toEqual(mockTask);
  });

  it('should delete a task', async () => {
    await expect(service.delete('someId')).resolves.toBeUndefined();
  });
});
