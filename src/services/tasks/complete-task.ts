import { Task } from "@prisma/client";
import { TasksRepository } from "@/repositories/tasks-repository";
import { ResourceNotFoundError } from "../errors/resources-not-found-error";

interface CompleteTaskServiceRequest {
  id: string;
}

interface CompleteTaskServiceResponse {
  task: Task;
}

export class CompleteTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    id,
  }: CompleteTaskServiceRequest): Promise<CompleteTaskServiceResponse> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new ResourceNotFoundError();
    }

    task.updated_at = new Date();
    task.completed_at = new Date();
    this.tasksRepository.save(task);

    return { task };
  }
}
