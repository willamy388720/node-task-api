import { beforeEach, describe, it, expect } from "vitest";
import { CreateTaskService } from "@/services/tasks/create-task";
import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository";

let tasksRepository: InMemoryTasksRepository;
let sut: CreateTaskService;

describe("Create Task Service", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new CreateTaskService(tasksRepository);
  });

  it("should to be able to create a task", async () => {
    const { task } = await sut.execute({
      title: "Create Task",
      description: "Create a task",
    });

    expect(task.id).toEqual(expect.any(String));
  });
});
