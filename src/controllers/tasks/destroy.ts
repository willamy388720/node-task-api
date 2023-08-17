import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteTaskService } from "../factories/make-delete-task-service";
import { ResourceNotFoundError } from "@/services/errors/resources-not-found-error";
import { PrismaTasksRepository } from "@/repositories/prisma/prisma-tasks-repository";

export async function destroy(request: FastifyRequest, reply: FastifyReply) {
  const destroyParamsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = destroyParamsSchema.parse(request.params);

  const deleteTaskService = makeDeleteTaskService();

  await deleteTaskService.execute({ id });

  return reply.status(200).send();
}
