import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateTaskService } from "../factories/make-update-task-service";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const updateSchema = z.object({
    title: z.string().nullable().default(null),
    description: z.string().nullable().default(null),
  });

  const { id } = updateParamsSchema.parse(request.params);
  const { title, description } = updateSchema.parse(request.body);

  const updateTaskService = makeUpdateTaskService();

  await updateTaskService.execute({ id, title, description });
  return reply.status(201).send();
}
