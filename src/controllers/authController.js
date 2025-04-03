import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User"; 

exports.getUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: "Username e password são obrigatórios" });
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Usuário já existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        return res.status(201).json({ message: "Usuário registrado!", userId: newUser.id });
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ message: "Erro ao criar usuário" });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const token = req.header("Authorization")?.split(" ")[1];

    if (token) {
        try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        return res.status(200).json({
            message: "Usuário já está logado",
            user: decoded
        });
        } catch (err) {
        console.log("Token inválido", err);
        }
    }

    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token: newToken });
};

exports.authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Token não fornecido" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id; 
      next(); 
    } catch (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
};
  