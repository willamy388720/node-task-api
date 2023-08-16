import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository";
import { CreateTaskService } from "@/services/tasks/create-task";

export function makeCreateTaskService() {
  const prismaTasksRepository = new PrismaTasksRepository();
  const service = new CreateTaskService(prismaTasksRepository);

  return service;
}
