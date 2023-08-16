import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Show Task (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list the tasks", async () => {
    await prisma.task.create({
      data: {
        title: "Criando uma tarefa",
        description: "Lorem ipsum dolor sit amet, consectetur adip",
      },
    });

    const response = await request(app.server).get("/tasks").send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.tasks).toEqual([
      expect.objectContaining({
        title: "Criando uma tarefa",
      }),
    ]);
  });
});
