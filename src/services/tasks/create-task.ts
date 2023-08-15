import { Task } from "@prisma/client";
import { TasksRepository } from "@/repositories/tasks-repository";

interface CreateTaskServiceRequest {
  title: string;
  description: string;
}

interface CreateTaskServiceResponse {
  task: Task;
}

export class CreateTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    title,
    description,
  }: CreateTaskServiceRequest): Promise<CreateTaskServiceResponse> {
    const task = await this.tasksRepository.create({ title, description });

    return { task };
  }
}
