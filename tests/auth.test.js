import request from "supertest";
import { app, sequelize } from "../app.js"; 
import bcrypt from "bcryptjs";
import User from "../src/models/User.js";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close(); 
});

describe("POST /login", () => {
    it("should login an account", async () => {
        const hashedPassword = await bcrypt.hash("senha123", 10);
        await User.create({
            username: "isabella",
            password: hashedPassword
        });

        const response = await request(app)
            .post("/login")
            .send({ username: "isabella", password: "senha123" });

        expect(response.status).toBe(200);  
        expect(response.body).toHaveProperty("token"); 
    });
});

describe("POST /register", () => {
    beforeEach(async () => {
        await User.destroy({ where: {} });
    });

    it("should create a new user", async () => {
        const response = await request(app)
        .post("/register")
        .send({ username: "isabella", password: "senha123" });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Usuário registrado!");
        expect(response.body).toHaveProperty("userId");
    });

    it("should return an error if the user already exists", async () => {
        const hashedPassword = await bcrypt.hash("senha123", 10);
        await User.create({
            username: "isabella",
            password: hashedPassword
        });
    
        const response = await request(app)
          .post("/register")
          .send({ username: "isabella", password: "senha123" });
    
        expect(response.status).toBe(400); 
        expect(response.body).toHaveProperty("message", "Usuário já existe"); 
      });
});

