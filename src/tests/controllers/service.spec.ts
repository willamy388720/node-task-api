import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Task (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search for tasks", async () => {
    await prisma.task.createMany({
      data: [
        {
          title: "Criando uma tarefa",
          description: "Lorem ipsum dolor sit amet, consectetur adip",
        },
        {
          title: "Criando outra tarefa",
          description: "Lorem ipsum dolor sit amet, consectetur adip",
        },
      ],
    });

    const response = await request(app.server)
      .get("/tasks/search")
      .query({
        q: "outra",
      })
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.tasks).toEqual([
      expect.objectContaining({
        title: "Criando outra tarefa",
      }),
    ]);
  });
});
