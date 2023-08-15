import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository";
import { DeleteTaskService } from "@/services/tasks/delete-task";

let tasksRepository: InMemoryTasksRepository;
let sut: DeleteTaskService;

describe("Delete Task Service", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new DeleteTaskService(tasksRepository);
  });

  it("should to be able to delete a task ", async () => {
    const task = await tasksRepository.create({
      title: "Create Task",
      description: "Create a task",
    });

    await sut.execute({
      id: task.id,
    });

    expect(tasksRepository.items).toHaveLength(0);
  });
});
