import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository";
import { DeleteTaskService } from "@/services/tasks/delete-task";

export function makeDeleteTaskService() {
  const prismaTasksRepository = new PrismaTasksRepository();
  const service = new DeleteTaskService(prismaTasksRepository);

  return service;
}
