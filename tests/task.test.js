import request from "supertest";
import { app, sequelize } from "../app.js"; 
import Task from "../src/models/Task.js";
import User from "../src/models/User.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close(); 
}); 

describe("Tasks CRUD", () => {
  let userID;
  let token;

  beforeEach(async () => {
    await Task.destroy({ where: {} });
    await User.destroy({ where: {} });

    const hashedPassword = await bcrypt.hash("senha123", 10);
    const user = await User.create({
      username: "testuser",
      password: hashedPassword
    });

    const loginResponse = await request(app)
      .post("/login")
      .send({ username: "testuser", password: "senha123" });

    token = loginResponse.body.token;
    userID = user.id;
  });

  afterEach(async () => {
    await Task.destroy({ where: {} });
    await User.destroy({ where: {} });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          title: "Nova Tarefa",
          description: "Descrição da tarefa",
          userId: userID,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("title", "Nova Tarefa");
      expect(response.body).toHaveProperty("userId", userID);
    });

    it("should return an error if the user does not exist", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${token}`) 
        .set("Content-Type", "application/json")
        .send({
          title: "Nova Tarefa",
          description: "Descrição da tarefa",
          userId: 9999, 
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Usuário não encontrado");
    });
  });

  it("should return a list of tasks", async () => {
    const task = await Task.create({
      title: "Tarefa 1",
      description: "Descrição da Tarefa 1",
      userId: userID,
    });

    const response = await request(app)
      .get("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("title", "Tarefa 1");
    expect(response.body[0]).toHaveProperty("userId", userID);
  });

  describe("PUT /tasks/:id", () => {
    it("should update a task", async () => {
      const task = await Task.create({
        title: "Tarefa Original",
        description: "Descrição da tarefa",
        userId: userID,
      });

      const updatedTask = {
        title: "Tarefa Atualizada",
        description: "Descrição atualizada",
        status: "em andamento"
      };

      const response = await request(app)
        .put(`/tasks/${task.id}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send(updatedTask);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("title", "Tarefa Atualizada");
      expect(response.body).toHaveProperty("status", "em andamento");
    });

    it("should return an error if the task is not found", async () => {
      const fakeUUID = uuidv4();

      const response = await request(app)
        .put(`/tasks/${fakeUUID}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json")
        .send({
          title: "Tarefa Atualizada",
          description: "Descrição atualizada",
          status: "em andamento"
        });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Tarefa não encontrada");
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete a task", async () => {
      const task = await Task.create({
        title: "Tarefa para deletar",
        description: "Descrição da tarefa para deletar",
        userId: userID,
      });

      const response = await request(app)
        .delete(`/tasks/${task.id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it("should return an error if the task is not found", async () => {
      const fakeUUID = uuidv4();

      const response = await request(app)
        .delete(`/tasks/${fakeUUID}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Content-Type", "application/json"); 

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("message", "Tarefa não encontrada");
    });
  });

});
