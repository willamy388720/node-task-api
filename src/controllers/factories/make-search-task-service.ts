import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository";
import { SearchTasksService } from "@/services/tasks/search-tasks";

export function makeSearchTasksService() {
  const prismaTasksRepository = new PrismaTasksRepository();
  const service = new SearchTasksService(prismaTasksRepository);

  return service;
}
