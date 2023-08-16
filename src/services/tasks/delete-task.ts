import { TasksRepository } from "@/repositories/tasks-repository";
import { ResourceNotFoundError } from "../errors/resources-not-found-error";

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
      throw new ResourceNotFoundError();
    }

    await this.tasksRepository.delete(task);

    return {};
  }
}
