import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository";
import { UpdateTaskService } from "@/services/tasks/update-task";

export function makeUpdateTaskService() {
  const prismaTasksRepository = new PrismaTasksRepository();
  const service = new UpdateTaskService(prismaTasksRepository);

  return service;
}
