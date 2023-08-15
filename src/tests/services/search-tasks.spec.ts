import { beforeEach, describe, it, expect } from "vitest";
import { InMemoryTasksRepository } from "@/repositories/in-memory/in-memory-tasks-repository";
import { SearchTasksService } from "@/services/tasks/search-tasks";

let tasksRepository: InMemoryTasksRepository;
let sut: SearchTasksService;

describe("Fetch Tasks Service", () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository();
    sut = new SearchTasksService(tasksRepository);
  });

  it("should to be able to search for tasks", async () => {
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
      query: "3",
      page: 1,
    });

    expect(tasks).toHaveLength(1);
    expect(tasks).toEqual([
      expect.objectContaining({ title: "Create Task 3" }),
    ]);
  });
});
