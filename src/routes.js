const express = require("express");
const authController = require("./controllers/authController");

const router = express.Router();

// Rotas de autenticação
router.post("/register", authController.register);

module.exports = router;