import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCompleteTaskService } from "../factories/make-complete-task-service";

export async function complete(request: FastifyRequest, reply: FastifyReply) {
  const completeParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = completeParamsSchema.parse(request.params);

  const completeTaskService = makeCompleteTaskService();

  await completeTaskService.execute({ id });

  return reply.status(201).send();
}
