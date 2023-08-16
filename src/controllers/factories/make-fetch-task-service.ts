import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository";
import { FetchTasksService } from "@/services/tasks/fetch-tasks";

export function makeFetchTaskService() {
  const prismaTasksRepository = new PrismaTasksRepository();
  const service = new FetchTasksService(prismaTasksRepository);

  return service;
}
