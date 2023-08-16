import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchTaskService } from "../factories/make-fetch-task-service";

export async function show(request: FastifyRequest, reply: FastifyReply) {
  const showSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = showSchema.parse(request.query);

  const fetchTaskService = makeFetchTaskService();

  const { tasks } = await fetchTaskService.execute({ page });

  return reply.status(200).send({
    tasks,
  });
}
