const Task = require('../models/Task'); 
const User = require('../models/User');  

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: User, 
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error: err });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, userId } = req.body; 

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const newTask = await Task.create({
      title,
      description,
      userId, 
    });
    res.status(201).json(newTask); 
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error: err });
  }
};