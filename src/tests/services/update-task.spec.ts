import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository";
import { UpdateTaskService } from "@/services/tasks/update-task";

let tasksRepository: InMemoryTasksRepository;
let sut: UpdateTaskService;

describe("Update Task Service", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new UpdateTaskService(tasksRepository);
  });

  it("should to be able to update title and description in task ", async () => {
    const task = await tasksRepository.create({
      title: "Create Task",
      description: "Create a task",
    });

    await sut.execute({
      id: task.id,
      title: "Update Task",
      description: "Update a task",
    });

    expect(tasksRepository.items[0].updated_at).toEqual(expect.any(Date));
    expect(tasksRepository.items[0]).toEqual(
      expect.objectContaining({
        title: "Update Task",
        description: "Update a task",
      })
    );
  });
});
