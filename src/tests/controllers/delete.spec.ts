import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Destroy Task (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to delete a task", async () => {
    const task = await prisma.task.create({
      data: {
        title: "Criando uma tarefa",
        description: "Lorem ipsum dolor sit amet, consectetur adip",
      },
    });

    const response = await request(app.server)
      .delete(`/tasks/${task.id}`)
      .send();

    const allTask = await prisma.task.findMany();

    expect(response.statusCode).toEqual(200);
    expect(allTask).toHaveLength(0);
  });
});
