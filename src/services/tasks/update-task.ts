import { Task } from "@prisma/client";
import { TasksRepository } from "@/repositories/tasks-repository";

interface UpdateTaskServiceRequest {
  id: string;
  title: string | null;
  description: string | null;
}

interface UpdateTaskServiceResponse {
  task: Task;
}

export class UpdateTaskService {
  constructor(private tasksRepository: TasksRepository) {}

  async execute({
    id,
    title,
    description,
  }: UpdateTaskServiceRequest): Promise<UpdateTaskServiceResponse> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new Error("Task not found");
    }

    if (title) {
      task.title = title;
    }

    if (description) {
      task.description = description;
    }

    task.updated_at = new Date();
    this.tasksRepository.save(task);

    return { task };
  }
}
