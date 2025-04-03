import express from "express";
import authController from "./controllers/authController.js";
import taskController from "./controllers/taskController.js";

const router = express.Router();

// Rotas de autenticação
router.post("/register", authController.register);
router.post("/login", authController.login);
// router.get("/users", authController.authMiddleware, authController.getUsers);
router.get("/users", authController.getUsers);


// Rotas de tarefas (protegidas por autenticação)
router.get("/tasks", authController.authMiddleware, taskController.getTasks);
router.post("/create-task", authController.authMiddleware, taskController.createTask);
router.put("/update-task/:id", authController.authMiddleware, taskController.updateTask);
router.delete("/delete-task/:id", authController.authMiddleware, taskController.deleteTask);

export default router;