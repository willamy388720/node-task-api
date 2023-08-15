import { Prisma, Task } from "@prisma/client";
import { TasksRepository } from "../tasks-repository";
import { randomUUID } from "crypto";

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async getAll(page: number) {
    return this.items.slice((page - 1) * 20, page * 20);
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
