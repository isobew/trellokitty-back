const express = require("express");
const authController = require("./controllers/authController");

const router = express.Router();

// Rotas de autenticação
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/users", authController.authMiddleware, authController.getUsers);

module.exports = router;