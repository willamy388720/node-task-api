import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository";
import { CompleteTaskService } from "@/services/tasks/complete-task";

let tasksRepository: InMemoryTasksRepository;
let sut: CompleteTaskService;

describe("Complete Task Service", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new CompleteTaskService(tasksRepository);
  });

  it("should to be able to complete a task ", async () => {
    const task = await tasksRepository.create({
      title: "Create Task",
      description: "Create a task",
    });

    await sut.execute({
      id: task.id,
    });

    expect(tasksRepository.items[0].completed_at).toEqual(expect.any(Date));
  });
});
