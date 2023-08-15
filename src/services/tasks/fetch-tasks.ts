import { Task } from "@prisma/client";
import { TasksRepository } from "@/repositories/tasks-repository";

interface FetchTasksServiceRequest {
  page: number;
}

interface FetchTasksServiceResponse {
  tasks: Task[];
}

export class FetchTasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    page,
  }: FetchTasksServiceRequest): Promise<FetchTasksServiceResponse> {
    const tasks = await this.tasksRepository.getAll(page);

    return { tasks };
  }
}
