import { Task, Prisma } from "@prisma/client";

export interface TasksRepository {
  search(query: string, page: number): Promise<Task[]>;
  getAll(page: number): Promise<Task[]>;
  create(data: Prisma.TaskCreateInput): Promise<Task>;
}
