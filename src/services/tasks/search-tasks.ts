import { Task } from "@prisma/client";
import { TasksRepository } from "@/repositories/tasks-repository";

interface SearchTasksServiceRequest {
  query: string;
  page: number;
}

interface SearchTasksServiceResponse {
  tasks: Task[];
}

export class SearchTasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    query,
    page,
  }: SearchTasksServiceRequest): Promise<SearchTasksServiceResponse> {
    const tasks = await this.tasksRepository.search(query, page);

    return { tasks };
  }
}
