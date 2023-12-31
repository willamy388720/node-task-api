import { Task, Prisma } from "@prisma/client";

export interface TasksRepository {
  findById(id: string): Promise<Task | null>;
  search(query: string, page: number): Promise<Task[]>;
  getAll(page: number): Promise<Task[]>;
  delete(task: Task): Promise<void>;
  save(task: Task): Promise<Task>;
  create(data: Prisma.TaskCreateInput): Promise<Task>;
}
