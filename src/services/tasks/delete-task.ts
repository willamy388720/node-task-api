import { TasksRepository } from "@/repositories/tasks-repository";

interface DeleteTaskServiceRequest {
  id: string;
}

interface DeleteTaskServiceResponse {}

export class DeleteTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    id,
  }: DeleteTaskServiceRequest): Promise<DeleteTaskServiceResponse> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    await this.tasksRepository.delete(task);

    return {};
  }
}
