import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository";
import { CompleteTaskService } from "@/services/tasks/complete-task";

export function makeCompleteTaskService() {
  const prismaTasksRepository = new PrismaTasksRepository();
  const service = new CompleteTaskService(prismaTasksRepository);

  return service;
}
