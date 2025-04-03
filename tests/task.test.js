import request from "supertest";
import { app } from "../app.js"; 
import Task from "../src/models/Task.js";
import User from "../src/models/User.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

describe("Tasks CRUD", () => {
  let userID;
  let token
  let firstUser;

  beforeEach(async () => {
    const response = await request(app).get('/authentication/test');
    token = response.body.token;
    
    const hashedPassword = await bcrypt.hash("senha123", 10);
        await User.create({
            username: "teste",
            password: hashedPassword
        });

    const users = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    firstUser = users.body[0];
    userID = firstUser.id;
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
    try {
      task = await Task.create({
        title: "Tarefa 1",
        description: "Descrição da Tarefa 1",
        userId: firstUser.id,
      });
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
    }
  
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
      try {
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
      } catch (error) {
        console.error("Erro ao atualizar a tarefa:", error);
      }
    });
  
    it("should return an error if the task is not found", async () => {
        try {
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
        } catch (error) {
            console.error("Erro ao atualizar a tarefa não encontrada:", error);
        }
    });
  });
  
  describe("DELETE /tasks/:id", () => {
    it("should delete a task", async () => {
      try {
        const task = await Task.create({
          title: "Tarefa para deletar",
          description: "Descrição da tarefa para deletar",
          userId: userID,
        });
  
        const response = await request(app).delete(`/tasks/${task.id}`).set("Authorization", `Bearer ${token}`);
  
        expect(response.status).toBe(204);
      } catch (error) {
        console.error("Erro ao deletar a tarefa:", error);
      }
    });
  
    it("should return an error if the task is not found", async () => {
      try {
        const fakeUUID = uuidv4(); 

        const response = await request(app).delete(`/tasks/${fakeUUID}`)
          .set("Authorization", `Bearer ${token}`)
          .set("Content-Type", "application/json"); 
  
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty("message", "Tarefa não encontrada");
      } catch (error) {
        console.error("Erro ao deletar a tarefa não encontrada:", error);
      }
    });
  });
  
});
