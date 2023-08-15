import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository";
import { FetchTasksService } from "@/services/tasks/fetch-tasks";

let tasksRepository: InMemoryTasksRepository;
let sut: FetchTasksService;

describe("Fetch Tasks Service", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new FetchTasksService(tasksRepository);
  });

  it("should to be able to fetch tasks", async () => {
    await tasksRepository.create({
      title: "Create Task 1",
      description: "Lorem ipsum dolor sit amet, consectetur",
    });

    await tasksRepository.create({
      title: "Create Task 2",
      description: "Lorem ipsum dolor sit amet, consectetur",
    });

    await tasksRepository.create({
      title: "Create Task 3",
      description: "Lorem ipsum dolor sit amet, consectetur",
    });

    const { tasks } = await sut.execute({
      page: 1,
    });

    expect(tasks).toHaveLength(3);
    expect(tasks).toEqual([
      expect.objectContaining({ title: "Create Task 1" }),
      expect.objectContaining({ title: "Create Task 2" }),
      expect.objectContaining({ title: "Create Task 3" }),
    ]);
  });

  it("should be able to fetch paginated tasks", async () => {
    for (let i = 1; i <= 22; i++) {
      await tasksRepository.create({
        title: `Create Task ${i}`,
        description: "Lorem ipsum dolor sit amet, consectetur",
      });
    }

    const { tasks } = await sut.execute({
      page: 2,
    });

    expect(tasks).toHaveLength(2);
    expect(tasks).toEqual([
      expect.objectContaining({ title: "Create Task 21" }),
      expect.objectContaining({ title: "Create Task 22" }),
    ]);
  });
});
