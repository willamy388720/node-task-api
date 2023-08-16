import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchTasksService } from "../factories/make-search-task-service";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchSquema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchSquema.parse(request.query);

  const searchTaskService = makeSearchTasksService();

  const { tasks } = await searchTaskService.execute({
    query: q,
    page,
  });

  return reply.status(200).send({
    tasks,
  });
}
