const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); 

exports.getUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
    }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "Usuário registrado!", userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
};
