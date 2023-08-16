import { FastifyInstance } from "fastify";
import { create } from "./create";
import { show } from "./show";

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/tasks", create);
  app.get("/tasks", show);
}
