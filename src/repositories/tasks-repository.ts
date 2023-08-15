import { Task, Prisma } from "@prisma/client";

export interface TasksRepository {
  getAll(page: number): Promise<Task[]>;
  create(data: Prisma.TaskCreateInput): Promise<Task>;
}
