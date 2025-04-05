import Task from '../models/Task.js'; 
import User from'../models/User.js';  

const getTasks = async (req, res) => {
    try {
    const tasks = await Task.findAll({
        include: User, 
    });
    res.json(tasks);
    } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error: err });
    }
};

const createTask = async (req, res) => {
    const { title, description, category } = req.body; 
    const userId = req.userId;

    try {
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const newTask = await Task.create({
        title,
        description,
        category,
        userId
    });
    res.status(201).json(newTask); 
    } catch (err) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error: err });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, user_id, category } = req.body;
  
    try {
      const task = await Task.findByPk(id);  
  
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
  
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      task.category = category || task.category;
      task.userId = user_id || task.userId;
  
      await task.save(); 
  
      res.json(task); 
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar tarefa', error: err });
    }
};


const deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await Task.findByPk(id); 
  
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }
  
      await task.destroy();  
  
      res.status(204).send();  
    } catch (err) {
      res.status(500).json({ message: 'Erro ao deletar tarefa', error: err });
    }
};
  
export default { getTasks, createTask, updateTask, deleteTask };