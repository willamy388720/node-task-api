import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Complete Task (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to complete a task", async () => {
    const task = await prisma.task.create({
      data: {
        title: "Criando uma tarefa",
        description: "Lorem ipsum dolor sit amet, consectetur adip",
      },
    });

    const response = await request(app.server)
      .patch(`/tasks/${task.id}/complete`)
      .send();

    const taskComplete = await prisma.task.findUnique({
      where: { id: task.id },
    });

    expect(response.statusCode).toEqual(201);
    expect(taskComplete?.completed_at).toEqual(expect.any(Date));
  });
});
