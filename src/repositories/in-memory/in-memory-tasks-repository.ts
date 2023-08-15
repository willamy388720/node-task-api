import { Prisma, Task } from "@prisma/client";
import { TasksRepository } from "../tasks-repository";
import { randomUUID } from "crypto";

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async findById(id: string) {
    const task = this.items.find((item) => item.id === id);

    if (!task) {
      return null;
    }

    return task;
  }

  async search(query: string, page: number) {
    return this.items
      .filter(
        (item) => item.title.includes(query) || item.description.includes(query)
      )
      .slice((page - 1) * 20, page * 20);
  }

  async getAll(page: number) {
    return this.items.slice((page - 1) * 20, page * 20);
  }

  async save(task: Task) {
    const taskIndex = this.items.findIndex((item) => item.id === task.id);

    if (taskIndex >= 0) {
      this.items[taskIndex] = task;
    }

    return task;
  }

  async create(data: Prisma.TaskCreateInput) {
    const task = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      completed_at: data.completed_at ? new Date(data.completed_at) : null,
      created_at: new Date(),
      updated_at: data.updated_at ? new Date(data.updated_at) : null,
    };

    this.items.push(task);

    return task;
  }
}
