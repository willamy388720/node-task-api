import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Update Task (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to update a task", async () => {
    const task = await prisma.task.create({
      data: {
        title: "Criando uma tarefa",
        description: "Lorem ipsum dolor sit amet, consectetur adip",
      },
    });

    const response = await request(app.server).put(`/tasks/${task.id}`).send({
      title: "Criando outra tarefa",
      description: "Lorem ipsum dolor sit amet, consectetur adip",
    });

    const taskUpdate = await prisma.task.findUnique({ where: { id: task.id } });

    expect(response.statusCode).toEqual(201);
    expect(taskUpdate?.updated_at).toEqual(expect.any(Date));
  });
});
