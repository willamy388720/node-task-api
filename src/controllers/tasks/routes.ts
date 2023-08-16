import { FastifyInstance } from "fastify";
import { create } from "./create";
import { show } from "./show";
import { search } from "./search";
import { update } from "./update";

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/tasks", create);
  app.get("/tasks", show);
  app.get("/tasks/search", search);
  app.put("/tasks/:id", update);
}
