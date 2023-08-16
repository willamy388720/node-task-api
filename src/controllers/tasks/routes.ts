import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/tasks", create);
}
