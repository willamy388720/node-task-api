import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateTaskService } from "../factories/make-create-task-service";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTaskBodySchema = z.object({
    title: z.string(),
    description: z.string(),
  });

  const { title, description } = createTaskBodySchema.parse(request.body);

  const createTaskService = makeCreateTaskService();

  createTaskService.execute({
    title,
    description,
  });

  return reply.status(201).send();
}
