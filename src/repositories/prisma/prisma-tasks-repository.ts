import { Prisma, Task } from "@prisma/client";
import { TasksRepository } from "../tasks-repository";
import { prisma } from "@/lib/prisma";

export class PrismaTasksRepository implements TasksRepository {
  async findById(id: string) {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    return task;
  }

  async delete(data: Task) {
    await prisma.task.delete({
      where: { id: data.id },
    });
  }

  async search(query: string, page: number) {
    const task = await prisma.task.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
        ],
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return task;
  }

  async getAll(page: number) {
    return await prisma.task.findMany({ take: 20, skip: (page - 1) * 20 });
  }

  async save(data: Task) {
    const task = await prisma.task.update({
      where: { id: data.id },
      data,
    });

    return task;
  }

  async create(data: Prisma.TaskCreateInput) {
    const task = await prisma.task.create({ data });

    return task;
  }
}
