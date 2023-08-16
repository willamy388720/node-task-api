import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Task (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a task", async () => {
    const response = await request(app.server).post("/tasks").send({
      title: "Criando uma tarefa",
      description: "Lorem ipsum dolor sit amet, consectetur adip",
    });

    expect(response.statusCode).toEqual(201);
  });
});
